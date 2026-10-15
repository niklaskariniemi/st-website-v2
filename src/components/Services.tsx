import React from 'react';
import { Cloud, Database, Smartphone, Check, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const Services: React.FC = () => {
  const services = [
    {
      id: 'cloud-devops',
      title: 'Cloud Architecture & DevOps Automation',
      icon: (
        <svg
          className="w-8 h-8 text-[#5f985d]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M12 12v6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      ),
      keywords: [
        'Cloud Architecture & Infrastructure',
        'DevOps Automation & IaC',
        'CI/CD Pipeline Security & Automation',
      ],
      description:
        'Stop worrying about server crashes, slow deployments, or high cloud bills. We design self-scaling cloud setups that adjust automatically to user demand, ensuring your systems stay online 24/7 while keeping hosting costs as low as possible.',
      benefits: [
        {
          name: 'Zero Downtime Deployments',
          detail: 'Update your software seamlessly without interrupting customers.',
        },
        {
          name: 'Automated Security',
          detail:
            'Embedded vulnerability checks and automated configuration testing via DevOps Automation & IaC.',
        },
        {
          name: 'Cost-Efficient Cloud Setup',
          detail:
            'Auto-scaling infrastructure that charges you only for what you actually use.',
        },
      ],
    },
    {
      id: 'data-modernization',
      title: 'Legacy Data Modernization & Data Pipelines',
      icon: (
        <svg
          className="w-8 h-8 text-[#5f985d]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      ),
      keywords: [
        'Legacy Data Modernization',
        'Data Engineering & Automated ETL',
        'BigQuery Analytics & BI Dashboards',
      ],
      description:
        'Replace slow manual spreadsheets and outdated database systems with automated data workflows. We connect your isolated company tools into a single source of truth, delivering real-time business reports directly to your leadership team.',
      benefits: [
        {
          name: 'Faster Decision Making',
          detail:
            'Eliminate hours spent waiting on manual weekly spreadsheet exports through Data Engineering & Automated ETL.',
        },
        {
          name: 'Centralized Reporting',
          detail:
            'Load data automatically into cloud warehouses with automated BigQuery Analytics & BI Dashboards.',
        },
        {
          name: 'Seamless System Integration',
          detail:
            'Connect old enterprise software directly to modern cloud tools.',
        },
      ],
    },
    {
      id: 'custom-apps',
      title: 'Custom Cloud Application Development',
      icon: (
        <svg
          className="w-8 h-8 text-[#5f985d]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 8 3 3-3 3" />
          <path d="M14 14h1" />
        </svg>
      ),
      keywords: [
        'Custom Cloud Application Development',
        'Serverless Infrastructure & Cloud Run',
      ],
      description:
        'Turn your business idea or internal operational need into a fast, reliable web or mobile application. We build custom digital products engineered to handle thousands of concurrent users with real-time data sync.',
      benefits: [
        {
          name: 'High-Performance User Experience',
          detail:
            'Blazing-fast page load times and real-time content updates.',
        },
        {
          name: 'Built to Scale',
          detail:
            'Engineered on top of modern Serverless Infrastructure & Cloud Run for effortless expansion.',
        },
        {
          name: 'Secure & Isolated',
          detail:
            'Enterprise-grade security rules protecting client and user data at every layer.',
        },
      ],
    },
  ];

  const handleCardClick = (title: string) => {
    trackEvent('service_card_click', {
      service_title: title,
    });
  };

  return (
    <section id="services" className="bg-[#f3f3f4] py-20 sm:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Header */}
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
            WHAT WE DO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111d13] tracking-tight leading-tight">
            Practical Cloud Solutions Built for Business Scalability
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Engineered architecture designed to eliminate bottlenecks, minimize overhead, and
            support long-term growth.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service.title)}
              className="group bg-white rounded-xl border border-[#e2e2e5] border-t-4 border-t-[#5f985d] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#f3f3f4] rounded-lg group-hover:bg-[#5f985d]/10 transition-colors">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-mono text-gray-600 bg-gray-100 px-2.5 py-1 rounded">
                    Enterprise Grade
                  </span>
                </div>

                {/* Card Title (H3) */}
                <h3 className="text-xl font-bold text-[#111d13] tracking-tight mb-4 group-hover:text-[#5f985d] transition-colors">
                  {service.title}
                </h3>

                {/* Plain-Language Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Embedded SEO Keyword Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50/70 border border-emerald-200/50 px-2 py-0.5 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Key Business Benefits */}
                <div className="space-y-3.5 pt-4 border-t border-gray-100 mb-6">
                  {service.benefits.map((b) => (
                    <div key={b.name} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#5f985d]/20 text-[#5f985d] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-gray-900 block">{b.name}:</span>
                        <span className="text-gray-600 leading-normal">{b.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="#contact"
                  onClick={() =>
                    trackEvent('click_cta', {
                      cta_name: `Inquire: ${service.title}`,
                      cta_location: 'service_card',
                    })
                  }
                  className="inline-flex items-center text-xs font-bold text-[#111d13] hover:text-[#5f985d] group-hover:translate-x-1 transition-all"
                >
                  Consult on this capability
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#5f985d]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
