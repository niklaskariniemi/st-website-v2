import React from 'react';
import { trackEvent } from '../lib/analytics';

export const Ecosystem: React.FC = () => {
  const technologies = [
    {
      name: 'Google Cloud Platform',
      tag: 'Cloud Infrastructure',
      desc: 'Secure, reliable cloud infrastructure hosting, Cloud Run, and enterprise networking.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
    },
    {
      name: 'Terraform',
      tag: 'IaC Automation',
      desc: 'Automated Infrastructure as Code for reproducible, version-controlled cloud environments.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      name: 'Docker',
      tag: 'Containerization',
      desc: 'Lightweight containerization for uniform and consistent software execution across environments.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      name: 'Python',
      tag: 'Data Automation',
      desc: 'High-efficiency data processing, custom ETL scripting, and backend automation microservices.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      name: 'Google BigQuery',
      tag: 'Cloud Warehousing',
      desc: 'High-speed petabyte-scale cloud data warehousing and real-time SQL analytics.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      ),
    },
    {
      name: 'Looker Studio',
      tag: 'BI Dashboards',
      desc: 'Interactive, real-time business intelligence dashboards providing executive visibility.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL & Firestore',
      tag: 'Database Engineering',
      desc: 'Robust, scalable relational SQL and real-time document NoSQL database management.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7c0-2 4-3 8-3s8 1 8 3v10c0 2-4 3-8 3s-8-1-8-3Z" />
          <path d="M4 12c0 2 4 3 8 3s8-1 8-3" />
        </svg>
      ),
    },
    {
      name: 'GitHub Actions',
      tag: 'CI/CD & Security',
      desc: 'Automated vulnerability scanning, unit testing, and continuous zero-downtime deployment pipelines.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4" />
          <path d="m4.93 4.93 2.83 2.83" />
          <path d="M2 12h4" />
          <path d="m4.93 19.07 2.83-2.83" />
          <path d="M12 18v4" />
          <path d="m19.07 19.07-2.83-2.83" />
          <path d="M18 12h4" />
          <path d="m19.07 4.93-2.83 2.83" />
        </svg>
      ),
    },
  ];

  return (
    <section id="ecosystem" className="bg-[#111d13] text-white py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
            MODERN TECH STACK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Enterprise-Grade Technologies &amp; Tools We Deploy
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Battle-tested industry standards selected for long-term maintainability, security, and
            predictable operational cost.
          </p>
        </div>

        {/* 8-Item Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              onClick={() =>
                trackEvent('tech_badge_click', {
                  technology: tech.name,
                })
              }
              className="group bg-[#162518] hover:bg-[#1d3220] rounded-xl border border-gray-800 hover:border-[#5f985d]/60 p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#111d13] border border-[#5f985d]/30 text-[#5f985d] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#5f985d] tracking-wider font-semibold">
                    {tech.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#5f985d] transition-colors">
                  {tech.name}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>Production Ready</span>
                <span className="text-[#5f985d]">&bull; Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
