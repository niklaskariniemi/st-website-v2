import React, { useEffect, useState } from 'react';
import { X, Activity, RefreshCw, Send, CheckCircle2, ShieldCheck, ExternalLink, Zap } from 'lucide-react';
import {
  GAEventLog,
  subscribeToGALogs,
  trackEvent,
  initGA,
  getCurrentMeasurementId,
} from '../lib/analytics';

interface AnalyticsInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsInspector: React.FC<AnalyticsInspectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [logs, setLogs] = useState<GAEventLog[]>([]);
  const [measurementId, setMeasurementId] = useState(getCurrentMeasurementId());
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [checkingApi, setCheckingApi] = useState(false);
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToGALogs((newLogs) => {
      setLogs(newLogs);
    });
    return unsubscribe;
  }, []);

  const checkServerStatus = async () => {
    setCheckingApi(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setApiStatus(data);
    } catch (e: any) {
      setApiStatus({ status: 'error', message: e.message });
    } finally {
      setCheckingApi(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkServerStatus();
    }
  }, [isOpen]);

  const handleUpdateMeasurementId = (e: React.FormEvent) => {
    e.preventDefault();
    if (measurementId.trim()) {
      initGA(measurementId.trim());
      trackEvent('ga_id_updated', { new_id: measurementId.trim() });
    }
  };

  const handleSendTestEvent = () => {
    trackEvent('test_ga_event', {
      source: 'Analytics Inspector',
      timestamp: new Date().toISOString(),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#111d13] text-gray-200 w-full max-w-2xl rounded-2xl border border-[#5f985d]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#162518]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111d13] border border-[#5f985d] flex items-center justify-center text-[#5f985d]">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Google Analytics 4 &amp; Resend Inspector
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Real-Time Event Stream &amp; Service Verifier
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section: Resend Integration Status */}
          <div className="bg-[#162518] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5f985d] font-bold flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Resend Email Dispatch Service
              </span>
              <button
                onClick={checkServerStatus}
                disabled={checkingApi}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <RefreshCw className={`w-3 h-3 ${checkingApi ? 'animate-spin' : ''}`} />
                Recheck
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#111d13] p-3 rounded-lg border border-gray-800">
                <div className="text-gray-400">Dispatch Endpoint</div>
                <div className="font-mono text-white mt-0.5">POST /api/contact</div>
              </div>
              <div className="bg-[#111d13] p-3 rounded-lg border border-gray-800">
                <div className="text-gray-400">Target Inbox</div>
                <div className="font-mono text-[#5f985d] mt-0.5 truncate">
                  {apiStatus?.emailService?.targetInbox || 'contact@salkintech.com'}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
              Contact submissions are routed through the Resend API. When <code className="text-[#5f985d]">RESEND_API_KEY</code> is set in the environment, live transactional emails are dispatched with branded HTML formatting.
            </p>
          </div>

          {/* Section: GA4 Configuration */}
          <div className="bg-[#162518] rounded-xl p-4 border border-gray-800">
            <div className="text-xs font-mono uppercase tracking-wider text-[#5f985d] font-bold mb-3 flex items-center justify-between">
              <span>Google Analytics 4 Tracking</span>
              <span className="text-emerald-400 text-[11px] font-normal flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                gtag.js Loaded
              </span>
            </div>

            <form onSubmit={handleUpdateMeasurementId} className="flex gap-2 mb-3">
              <input
                type="text"
                value={measurementId}
                onChange={(e) => setMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="flex-1 px-3 py-2 text-xs font-mono bg-[#111d13] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#5f985d]"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-lg transition-colors"
              >
                Set ID
              </button>
              <button
                type="button"
                onClick={handleSendTestEvent}
                className="px-3 py-2 text-xs font-semibold text-gray-200 bg-[#111d13] hover:text-white border border-gray-700 rounded-lg transition-colors flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-[#5f985d]" />
                {testSent ? 'Fired!' : 'Fire Test Event'}
              </button>
            </form>

            <div className="text-[11px] text-gray-400">
              Active GA Measurement ID: <code className="text-white font-mono">{measurementId}</code>. Automatically captures page views, button clicks, FAQ expands, and contact submissions.
            </div>
          </div>

          {/* Section: Live Event Stream */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold">
                Live Captured Event Stream ({logs.length})
              </h4>
              <span className="text-[11px] text-gray-400 font-mono">Newest first</span>
            </div>

            <div className="bg-[#111d13] border border-gray-800 rounded-xl max-h-56 overflow-y-auto divide-y divide-gray-800/80 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  No events captured yet. Navigate or click any button to see events.
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-3 hover:bg-[#162518] transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f985d] font-bold">{log.eventName}</span>
                      <span className="text-[10px] text-gray-400">{log.timestamp}</span>
                    </div>
                    {Object.keys(log.params).length > 0 && (
                      <div className="text-[11px] text-gray-400 mt-1 truncate">
                        {JSON.stringify(log.params)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-800 bg-[#162518] flex items-center justify-between text-xs text-gray-400">
          <span>Salkin Tech Production Observability</span>
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
