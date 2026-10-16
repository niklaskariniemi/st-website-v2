import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../.data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

export interface StoredLead {
  referenceId: string;
  name: string;
  email: string;
  service: string;
  scope: string;
  timestamp: string;
  syncedToSheets: boolean;
  sheetsRowId?: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getAllStoredLeads(): StoredLead[] {
  try {
    ensureDataDir();
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data) || [];
  } catch (err) {
    console.error('Error reading leads file:', err);
    return [];
  }
}

export function saveLead(lead: Omit<StoredLead, 'timestamp' | 'syncedToSheets'> & { timestamp?: string; syncedToSheets?: boolean }): StoredLead {
  try {
    ensureDataDir();
    const leads = getAllStoredLeads();
    const newLead: StoredLead = {
      ...lead,
      timestamp: lead.timestamp || new Date().toISOString(),
      syncedToSheets: lead.syncedToSheets || false,
    };
    leads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return newLead;
  } catch (err) {
    console.error('Error saving lead:', err);
    return {
      ...lead,
      timestamp: lead.timestamp || new Date().toISOString(),
      syncedToSheets: false,
    };
  }
}

export function markLeadSynced(referenceId: string): boolean {
  try {
    ensureDataDir();
    const leads = getAllStoredLeads();
    const target = leads.find((l) => l.referenceId === referenceId);
    if (target) {
      target.syncedToSheets = true;
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error marking lead synced:', err);
    return false;
  }
}
