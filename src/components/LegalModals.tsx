import React from 'react';
import { X, Shield, FileText, Network } from 'lucide-react';

interface LegalModalsProps {
  type: 'privacy' | 'terms' | 'sitemap' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#111d13] text-gray-200 w-full max-w-2xl rounded-2xl border border-[#5f985d]/40 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#162518]">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && <Shield className="w-5 h-5 text-[#5f985d]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#5f985d]" />}
            {type === 'sitemap' && <Network className="w-5 h-5 text-[#5f985d]" />}
            <h3 className="text-lg font-bold text-white capitalize">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'sitemap' && 'Website Sitemap'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-300 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p className="text-xs font-mono text-[#5f985d]">Effective Date: October 2026</p>
              <h4 className="text-base font-bold text-white">1. Information We Collect</h4>
              <p>
                Salkin Tech LLC collects contact information that you voluntarily submit through our
                contact and consultation inquiry forms, including your full name, work email, and
                project scope details.
              </p>
              <h4 className="text-base font-bold text-white">2. Purpose of Processing</h4>
              <p>
                Inquiry details are strictly used to evaluate engineering fit, draft technical proposals,
                and communicate directly regarding your software modernization goals. We never sell,
                rent, or share your contact information with external marketing brokers.
              </p>
              <h4 className="text-base font-bold text-white">3. Third-Party Infrastructure</h4>
              <p>
                We use Resend for transactional email dispatch and Google Analytics 4 to evaluate
                aggregated website performance metrics and conversion flows.
              </p>
              <h4 className="text-base font-bold text-white">4. Data Security &amp; Retention</h4>
              <p>
                All communications and transmitted project data are encrypted using TLS 1.3 standards.
                You may request complete deletion of your submitted inquiries at any time by contacting{' '}
                <a href="mailto:contact@salkintech.com" className="text-[#5f985d] underline">
                  contact@salkintech.com
                </a>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="text-xs font-mono text-[#5f985d]">Last Updated: October 2026</p>
              <h4 className="text-base font-bold text-white">1. Scope of Services</h4>
              <p>
                Salkin Tech LLC provides specialized engineering consultancy covering Cloud
                Architecture &amp; Infrastructure, DevOps Automation &amp; IaC, Legacy Data
                Modernization, and Custom Cloud Application Development.
              </p>
              <h4 className="text-base font-bold text-white">2. Engagements &amp; NDAs</h4>
              <p>
                All client architectural reviews, source code access, and database audits are governed
                by mutually executed Master Services Agreements (MSA), Statements of Work (SOW), and
                strict Non-Disclosure Agreements (NDA).
              </p>
              <h4 className="text-base font-bold text-white">3. Intellectual Property</h4>
              <p>
                Unless explicitly agreed otherwise in a written SOW, all deliverables, custom cloud
                scripts, and application code authored on behalf of a paid client are assigned to the
                client upon full milestone settlement.
              </p>
            </>
          )}

          {type === 'sitemap' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-[#5f985d]">
                Structural XML / HTML Map for Search Crawlers &amp; Users
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#162518] p-4 rounded-xl border border-gray-800">
                  <h5 className="font-bold text-white mb-2 text-sm">Primary Landing Pages</h5>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li><a href="#hero" onClick={onClose} className="hover:text-[#5f985d]">&bull; Home &amp; Hero Overview</a></li>
                    <li><a href="#services" onClick={onClose} className="hover:text-[#5f985d]">&bull; Core Services (What We Do)</a></li>
                    <li><a href="#projects" onClick={onClose} className="hover:text-[#5f985d]">&bull; Featured Client Projects</a></li>
                    <li><a href="#ecosystem" onClick={onClose} className="hover:text-[#5f985d]">&bull; Tech Ecosystem &amp; Stack</a></li>
                    <li><a href="#about" onClick={onClose} className="hover:text-[#5f985d]">&bull; About Salkin Tech</a></li>
                    <li><a href="#faq" onClick={onClose} className="hover:text-[#5f985d]">&bull; Frequently Asked Questions</a></li>
                    <li><a href="#contact" onClick={onClose} className="hover:text-[#5f985d]">&bull; Contact &amp; Consultation Form</a></li>
                  </ul>
                </div>
                <div className="bg-[#162518] p-4 rounded-xl border border-gray-800">
                  <h5 className="font-bold text-white mb-2 text-sm">Target SEO Topic Hubs</h5>
                  <ul className="space-y-1.5 text-xs text-gray-300 font-mono">
                    <li>&bull; Cloud Architecture &amp; Infrastructure</li>
                    <li>&bull; DevOps Automation &amp; IaC</li>
                    <li>&bull; Legacy Data Modernization</li>
                    <li>&bull; Serverless Infrastructure &amp; Cloud Run</li>
                    <li>&bull; BigQuery Analytics &amp; BI Dashboards</li>
                    <li>&bull; CI/CD Pipeline Security &amp; Automation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-800 bg-[#162518] text-right">
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
