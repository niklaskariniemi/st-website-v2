/**
 * Google Sheets Leads CRM Client
 */

export interface LeadRecord {
  timestamp: string;
  referenceId: string;
  name: string;
  email: string;
  service: string;
  scope: string;
  status: string;
  notes?: string;
}

export interface CrmSheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
}

const CRM_TITLE = 'Salkin Tech - Leads CRM';
const SHEET_TAB_NAME = 'Leads';

/**
 * Searches Google Drive for an existing "Salkin Tech - Leads CRM" sheet,
 * or creates one automatically if it does not exist yet.
 */
export async function getOrCreateLeadsSpreadsheet(accessToken: string): Promise<CrmSheetInfo> {
  // 1. Search Google Drive for existing sheet
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
    CRM_TITLE
  )}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id,name,webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      const file = searchData.files[0];
      return {
        spreadsheetId: file.id,
        spreadsheetUrl:
          file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
        title: file.name,
      };
    }
  }

  // 2. If not found, create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: CRM_TITLE,
      },
      sheets: [
        {
          properties: {
            title: SHEET_TAB_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Date / Time' } },
                    { userEnteredValue: { stringValue: 'Reference ID' } },
                    { userEnteredValue: { stringValue: 'Client Name' } },
                    { userEnteredValue: { stringValue: 'Work Email' } },
                    { userEnteredValue: { stringValue: 'Primary Focus Area' } },
                    { userEnteredValue: { stringValue: 'Project Scope & Bottlenecks' } },
                    { userEnteredValue: { stringValue: 'CRM Status' } },
                    { userEnteredValue: { stringValue: 'Internal Notes' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errData = await createRes.json();
    throw new Error(errData.error?.message || 'Failed to initialize Google Sheet CRM');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  return {
    spreadsheetId,
    spreadsheetUrl,
    title: CRM_TITLE,
  };
}

/**
 * Appends an incoming lead row into the CRM spreadsheet.
 */
export async function appendLeadToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  lead: {
    referenceId: string;
    name: string;
    email: string;
    service: string;
    scope: string;
  }
): Promise<boolean> {
  const values = [
    [
      new Date().toLocaleString(),
      lead.referenceId,
      lead.name,
      lead.email,
      lead.service,
      lead.scope,
      'New Lead',
      '',
    ],
  ];

  // Try appending to the 'Leads' sheet tab; fallback to 'Sheet1' if named differently
  let appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    SHEET_TAB_NAME
  )}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  let res = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!res.ok) {
    // Fallback: append to default first tab
    const fallbackUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    res = await fetch(fallbackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });
  }

  if (!res.ok) {
    const err = await res.json();
    console.error('Failed to append lead to Google Sheet:', err);
    throw new Error(err.error?.message || 'Failed to append lead to Google Sheet');
  }

  return true;
}

/**
 * Retrieves all stored leads from the CRM sheet for display in the app.
 */
export async function fetchLeadsFromSpreadsheet(
  accessToken: string,
  spreadsheetId: string
): Promise<LeadRecord[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:H500`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const rows: any[][] = data.values || [];

  return rows.map((row) => ({
    timestamp: row[0] || '',
    referenceId: row[1] || '',
    name: row[2] || '',
    email: row[3] || '',
    service: row[4] || '',
    scope: row[5] || '',
    status: row[6] || 'New Lead',
    notes: row[7] || '',
  }));
}
