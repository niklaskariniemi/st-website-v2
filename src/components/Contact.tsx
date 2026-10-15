import React, { useState } from 'react';
import { Mail, Calendar, ArrowRight, CheckCircle2, AlertCircle, Loader2, Copy, Check, FileSpreadsheet } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { getAccessToken } from '../lib/googleAuth';
import { getOrCreateLeadsSpreadsheet, appendLeadToSpreadsheet } from '../lib/sheetsCrm';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Cloud Architecture & DevOps Automation',
    scope: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [referenceId, setReferenceId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [otherServiceText, setOtherServiceText] = useState('');
  const [syncedToSheets, setSyncedToSheets] = useState(false);

  const serviceOptions = [
    'Cloud Architecture & DevOps Automation',
    'Legacy Data Modernization & Data Pipelines',
    'Custom Cloud Application Development',
    'General Engineering Consultation',
    'Other',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@salkintech.com');
    setCopiedEmail(true);
    trackEvent('copy_contact_email', { email: 'contact@salkintech.com' });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.scope.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const resolvedService =
      formData.service === 'Other' && otherServiceText.trim()
        ? `Other: ${otherServiceText.trim()}`
        : formData.service;

    trackEvent('contact_form_submit_attempt', {
      service: resolvedService,
      has_email: Boolean(formData.email),
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: resolvedService,
        }),
      });

      const contentType = response.headers.get('content-type');
      let data: any;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        console.warn('Server returned non-JSON response (possibly warmup or proxy HTML)');
        throw new Error(
          'The server is warming up. Please try again in a moment, or email us directly at contact@salkintech.com.'
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitSuccess(true);
      const generatedRef = data.referenceId || `ST-${Date.now().toString(36).toUpperCase()}`;
      setReferenceId(generatedRef);

      // Attempt automatic sync to Google Sheets CRM if OAuth access token is active
      try {
        const token = await getAccessToken();
        if (token) {
          const sheet = await getOrCreateLeadsSpreadsheet(token);
          await appendLeadToSpreadsheet(token, sheet.spreadsheetId, {
            referenceId: generatedRef,
            name: formData.name,
            email: formData.email,
            service: resolvedService,
            scope: formData.scope,
          });
          setSyncedToSheets(true);
          trackEvent('lead_auto_synced_to_sheets', { referenceId: generatedRef });
        }
      } catch (sheetsErr) {
        console.warn('Google Sheets auto-sync notice:', sheetsErr);
      }

      trackEvent('contact_form_submitted_success', {
        reference_id: generatedRef,
        service: resolvedService,
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred. Please try again or email us directly.'
      );
      trackEvent('contact_form_error', {
        error_message: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Cloud Architecture & DevOps Automation',
      scope: '',
    });
    setSubmitSuccess(null);
    setReferenceId('');
    setErrorMessage('');
    setSyncedToSheets(false);
  };

  return (
    <section id="contact" className="bg-[#111d13] text-white py-20 sm:py-28 relative">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5f985d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Copy & Calendar CTA (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
                GET IN TOUCH
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Ready to Modernize Your Systems &amp; Software?
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-10 max-w-xl">
                Tell us about your current technology stack or operational bottleneck. We will outline
                actionable, step-by-step solutions to automate, optimize, and scale your systems.
              </p>

              {/* Direct Email Card */}
              <div className="bg-[#162518] rounded-xl border border-gray-800 p-6 mb-6">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Direct Inquiries
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#111d13] border border-[#5f985d]/40 flex items-center justify-center text-[#5f985d]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <a
                        href="mailto:contact@salkintech.com"
                        className="text-base sm:text-lg font-bold text-white hover:text-[#5f985d] transition-colors"
                      >
                        contact@salkintech.com
                      </a>
                      <div className="text-xs text-gray-400 font-mono">
                        Resend Automated Dispatch Inbox
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 bg-[#111d13] hover:text-white border border-gray-700 rounded-md transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#5f985d]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Calendar Call Booking CTA */}
              <div className="bg-[#162518] rounded-xl border border-gray-800 p-6 mb-8">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Direct Engineering Schedule
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Prefer a live video session? Choose a time directly on our architects' calendar.
                </p>
                <a
                  href="https://calendar.app.google/k8GcJ2Sap7bE4EBp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('click_calendar_consultation', {
                      url: 'https://calendar.app.google/k8GcJ2Sap7bE4EBp6',
                      location: 'contact_section',
                    })
                  }
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-bold text-white border-2 border-[#5f985d] hover:bg-[#5f985d] rounded-[6px] transition-all group"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#5f985d] group-hover:text-white transition-colors" />
                  Schedule a 30-Minute Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="flex items-center gap-6 text-xs text-gray-400 pt-4 border-t border-gray-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d]" />
                24-Hour Response Time
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d]" />
                NDA Protected
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d]" />
                Zero Spam
              </span>
            </div>
          </div>

          {/* Right Column: Form Container Box (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white text-gray-900 rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-200">
              {submitSuccess ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#5f985d]/10 text-[#5f985d] flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#111d13] mb-2">
                    Inquiry Received
                  </h3>

                  <p className="text-sm font-mono text-[#5f985d] font-semibold mb-4">
                    Reference ID: {referenceId}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>.
                    Our engineering team has received your technical inquiry. We will review
                    your project scope and reply to <span className="font-semibold text-gray-900">{formData.email}</span> within 24 hours.
                  </p>

                  <div className="bg-[#f3f3f4] border border-[#5f985d]/30 rounded-lg p-3 mb-4 text-xs text-gray-700 max-w-md mx-auto flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5f985d] shrink-0" />
                    <span>A confirmation email has been dispatched to <strong>{formData.email}</strong>.</span>
                  </div>

                  {syncedToSheets && (
                    <div className="bg-[#162518] border border-[#5f985d]/40 rounded-lg p-2.5 mb-6 text-xs text-[#5f985d] max-w-md mx-auto flex items-center justify-center gap-2 font-mono">
                      <FileSpreadsheet className="w-4 h-4 text-[#5f985d] shrink-0" />
                      <span>Directly synced to Google Sheets Leads CRM!</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#111d13] bg-[#f3f3f4] hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-gray-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#111d13]">
                      Start a Project Discussion
                    </h3>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#f3f3f4] border border-[#d1d1d6] rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f985d] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label
                      htmlFor="workEmail"
                      className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                    >
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="workEmail"
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#f3f3f4] border border-[#d1d1d6] rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f985d] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Focus Area */}
                  <div>
                    <label
                      htmlFor="serviceFocus"
                      className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                    >
                      Primary Focus Area
                    </label>
                    <select
                      id="serviceFocus"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#f3f3f4] border border-[#d1d1d6] rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5f985d] focus:border-transparent transition-all"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {formData.service === 'Other' && (
                      <div className="mt-2.5 animate-in fade-in duration-200">
                        <input
                          type="text"
                          placeholder="Please specify project type or scope (e.g. AI Integration, Security Audit)..."
                          value={otherServiceText}
                          onChange={(e) => setOtherServiceText(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-[#f3f3f4] border border-[#d1d1d6] rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f985d] focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Scope / Question */}
                  <div>
                    <label
                      htmlFor="projectScope"
                      className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                    >
                      Project Scope / Question <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="projectScope"
                      rows={4}
                      required
                      placeholder="Outline your current systems, hosting environment, or data pipeline challenges..."
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-[#f3f3f4] border border-[#d1d1d6] rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5f985d] focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-[6px] bg-[#5f985d] hover:bg-[#4e824c] text-white text-base font-bold transition-all shadow-[0_2px_12px_rgba(95,152,93,0.3)] hover:shadow-[0_4px_16px_rgba(95,152,93,0.45)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-600 text-center pt-2">
                    Protected by secure TLS encryption. No sales spam or third-party sharing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
