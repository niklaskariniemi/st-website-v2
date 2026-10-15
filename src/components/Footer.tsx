import React from 'react';
import { ArrowUpRight, Mail, Calendar, MapPin } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface FooterProps {
  onOpenAnalytics?: () => void;
  onOpenCrm?: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'sitemap') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-[#111d13] text-gray-400 border-t-2 border-t-[#5f985d] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4">
            <a
              href="#hero"
              className="inline-flex items-center mb-4 group"
            >
              <span className="text-white font-bold text-xl tracking-tight">
                Salkin <span className="text-[#5f985d]">Tech</span>
              </span>
            </a>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Engineering-led cloud architecture, DevOps automation, and legacy data modernization
              consultancy. Built for growing enterprise solutions.
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#5f985d]" />
              <span>Phoenix, Arizona &bull; Remote First</span>
            </div>
          </div>

          {/* Column 2: Core Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'Cloud Architecture & Infrastructure' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  Cloud Architecture &amp; Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'DevOps Automation & IaC' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  DevOps Automation &amp; IaC
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'Legacy Data Modernization' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  Legacy Data Modernization
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'Custom Cloud Application Development' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  Custom Cloud Application Development
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solution Focus Areas (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Solution Focus Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#projects"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'Serverless Infrastructure & Cloud Run' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  Serverless Infrastructure &amp; Cloud Run
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'BigQuery Analytics & BI Dashboards' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  BigQuery Analytics &amp; BI Dashboards
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'CI/CD Pipeline Security & Automation' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  CI/CD Pipeline Security &amp; Automation
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() =>
                    trackEvent('footer_link_click', { target: 'Automated Data Engineering & ETL' })
                  }
                  className="hover:text-[#5f985d] transition-colors"
                >
                  Automated Data Engineering &amp; ETL
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact & Schedule (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@salkintech.com"
                  className="flex items-center gap-2 hover:text-[#5f985d] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#5f985d]" />
                  <span>contact@salkintech.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://calendar.app.google/k8GcJ2Sap7bE4EBp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('click_calendar_consultation', {
                      location: 'footer',
                    })
                  }
                  className="flex items-center gap-1.5 text-white hover:text-[#5f985d] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#5f985d]" />
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="w-3 h-3 text-[#5f985d]" />
                </a>
              </li>
              <li>
                <a
                  href="#ecosystem"
                  className="hover:text-[#5f985d] transition-colors"
                >
                  View Tech Ecosystem &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Sub-Footer Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-gray-400">
            &copy; 2026 Salkin Tech LLC. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-gray-300">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#5f985d] transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#5f985d] transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onOpenLegal('sitemap')}
              className="hover:text-[#5f985d] transition-colors underline-offset-4 hover:underline"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
