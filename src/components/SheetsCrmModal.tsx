import React, { useEffect, useState } from 'react';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  AlertCircle,
  Database,
  ArrowRight,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logout,
  getAccessToken,
  initAuth,
} from '../lib/googleAuth';
import {
  getOrCreateLeadsSpreadsheet,
  fetchLeadsFromSpreadsheet,
  appendLeadToSpreadsheet,
  CrmSheetInfo,
  LeadRecord,
} from '../lib/sheetsCrm';
import { trackEvent } from '../lib/analytics';

interface SheetsCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSheetConnected?: (sheetInfo: CrmSheetInfo) => void;
}

export const SheetsCrmModal: React.FC<SheetsCrmModalProps> = ({
  isOpen,
  onClose,
  onSheetConnected,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [sheetInfo, setSheetInfo] = useState<CrmSheetInfo | null>(null);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [testLeadSent, setTestLeadSent] = useState(false);

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setSheetInfo(null);
        setLeads([]);
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available, load or create the CRM sheet
  useEffect(() => {
    if (accessToken && isOpen) {
      loadCrmSheet(accessToken);
    }
  }, [accessToken, isOpen]);

  const loadCrmSheet = async (token: string) => {
    setLoadingSheet(true);
    setErrorMessage('');
    try {
      const sheet = await getOrCreateLeadsSpreadsheet(token);
      setSheetInfo(sheet);
      if (onSheetConnected) onSheetConnected(sheet);

      const records = await fetchLeadsFromSpreadsheet(token, sheet.spreadsheetId);
      setLeads(records);
      trackEvent('sheets_crm_loaded', { leadCount: records.length });
    } catch (err: any) {
      console.error('Error loading CRM sheet:', err);
      setErrorMessage(err.message || 'Failed to connect to Google Sheets CRM.');
    } finally {
      setLoadingSheet(false);
    }
  };

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setErrorMessage('');
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        trackEvent('google_signin_success', { email: result.user.email });
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setErrorMessage(err.message || 'Sign-in failed. Please try again.');
      trackEvent('google_signin_error', { error: err.message });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setSheetInfo(null);
    setLeads([]);
    trackEvent('google_signout');
  };

  const handleSendTestLead = async () => {
    if (!accessToken || !sheetInfo) return;
    setLoadingSheet(true);
    try {
      const testRef = `ST-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
      await appendLeadToSpreadsheet(accessToken, sheetInfo.spreadsheetId, {
        referenceId: testRef,
        name: 'Sample Enterprise Client',
        email: 'lead@enterprise-sample.com',
        service: 'Cloud Architecture & DevOps Automation',
        scope: 'Automated test CRM lead entry verification from Salkin Tech website.',
      });

      const updated = await fetchLeadsFromSpreadsheet(accessToken, sheetInfo.spreadsheetId);
      setLeads(updated);
      setTestLeadSent(true);
      setTimeout(() => setTestLeadSent(false), 3000);
      trackEvent('crm_test_lead_appended', { referenceId: testRef });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to add test lead.');
    } finally {
      setLoadingSheet(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#111d13] text-gray-200 w-full max-w-4xl rounded-2xl border border-[#5f985d]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#162518]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#111d13] border border-[#5f985d] flex items-center justify-center text-[#5f985d]">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Google Sheets Leads CRM
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Automated Pipeline for Website Leads &bull; Salkin Tech
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!currentUser ? (
            /* Not Signed In: Official Sign in with Google Button */
            <div className="text-center py-10 px-4 bg-[#162518] rounded-xl border border-gray-800 max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#5f985d]/10 text-[#5f985d] flex items-center justify-center mx-auto mb-4">
                <Database className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Connect Your Google Sheets CRM
              </h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
                Connect with your Google account to automatically create and sync all incoming
                client inquiries to a dedicated Google Sheet CRM with timestamps, project scopes,
                and statuses.
              </p>

              {/* Official Google Sign-In Button */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 cursor-pointer disabled:opacity-60"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>{isAuthenticating ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>

              <div className="mt-4 text-[11px] text-gray-400 font-mono">
                Requires permission to create and append to your Google Sheets CRM file.
              </div>
            </div>
          ) : (
            /* Signed In: Connected CRM Dashboard */
            <>
              {/* Account & Sheet Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account card */}
                <div className="bg-[#162518] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-[#5f985d]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#111d13] border border-[#5f985d] flex items-center justify-center text-[#5f985d]">
                        <UserIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-white">
                        {currentUser.displayName || 'Authorized Admin'}
                      </div>
                      <div className="text-xs text-gray-400 font-mono truncate max-w-[200px]">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#111d13] transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Spreadsheet status */}
                <div className="bg-[#162518] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#5f985d] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#5f985d]" />
                      CRM Active &bull; {leads.length} Leads
                    </div>
                    <div className="text-sm font-bold text-white mt-1 truncate max-w-[220px]">
                      {sheetInfo?.title || 'Salkin Tech - Leads CRM'}
                    </div>
                  </div>

                  {sheetInfo && (
                    <a
                      href={sheetInfo.spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-lg transition-colors"
                    >
                      <span>Open Sheet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-gray-400 font-mono">
                  All website contact form submissions will automatically write to this sheet.
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => accessToken && loadCrmSheet(accessToken)}
                    disabled={loadingSheet}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 bg-[#162518] hover:bg-[#1f3523] border border-gray-700 rounded-lg transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingSheet ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestLead}
                    disabled={loadingSheet}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{testLeadSent ? 'Test Lead Added!' : 'Add Sample Lead'}</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#162518]">
                <div className="px-4 py-3 bg-[#111d13] border-b border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-gray-300 tracking-wider">
                    Recent Captured Leads in Google Sheet
                  </span>
                  <span className="text-xs font-mono text-[#5f985d]">
                    Live Synced Rows: {leads.length}
                  </span>
                </div>

                {leads.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-400">
                    No leads recorded yet. Submit the website contact form or click &ldquo;Add Sample Lead&rdquo; to test.
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#111d13]/80 text-gray-400 font-mono uppercase text-[10px] sticky top-0">
                        <tr>
                          <th className="px-4 py-2.5">Date</th>
                          <th className="px-4 py-2.5">Ref</th>
                          <th className="px-4 py-2.5">Client Name</th>
                          <th className="px-4 py-2.5">Email</th>
                          <th className="px-4 py-2.5">Focus Area</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/80 font-mono">
                        {leads.map((lead, idx) => (
                          <tr key={lead.referenceId || idx} className="hover:bg-[#1f3523]/40 transition-colors">
                            <td className="px-4 py-2.5 text-gray-400 whitespace-nowrap">
                              {lead.timestamp}
                            </td>
                            <td className="px-4 py-2.5 text-[#5f985d] font-bold">
                              {lead.referenceId}
                            </td>
                            <td className="px-4 py-2.5 text-white font-sans font-medium">
                              {lead.name}
                            </td>
                            <td className="px-4 py-2.5 text-gray-300">
                              <a href={`mailto:${lead.email}`} className="hover:underline">
                                {lead.email}
                              </a>
                            </td>
                            <td className="px-4 py-2.5 text-gray-300">
                              {lead.service}
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#5f985d]/20 text-[#5f985d] border border-[#5f985d]/40">
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-800 bg-[#162518] flex items-center justify-between text-xs text-gray-400">
          <span>Google Drive &amp; Google Sheets API Integration</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
