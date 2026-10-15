import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs = [
    {
      question: 'How does cloud architecture modernization help my business save money?',
      answer:
        'Modern Cloud Architecture & Infrastructure eliminates the need to pay for oversized, always-running servers. By migrating to serverless platforms like Google Cloud Run, your system automatically scales up during busy traffic periods and drops down to zero when inactive. You pay only for the exact compute time your customers use, significantly reducing monthly cloud hosting costs while improving system stability.',
    },
    {
      question: 'What is legacy data modernization, and why is it important for my company?',
      answer:
        'Legacy Data Modernization is the process of replacing outdated database scripts, manual spreadsheet exports, and siloed software with automated cloud data pipelines. If your team wastes hours every week pulling manual reports, modernizing your data workflows with Data Engineering & Automated ETL will centralize your company data into modern cloud warehouses like Google BigQuery, providing instant, error-free business reports.',
    },
    {
      question: 'How do you automate DevOps pipelines without disrupting daily business operations?',
      answer:
        'We implement CI/CD Pipeline Security & Automation using zero-downtime deployment strategies. We set up automated testing environments that validate software updates, scan for security vulnerabilities, and verify system health before any changes go live to your customers. This guarantees your platform remains fully accessible and operational throughout the entire upgrade process.',
    },
    {
      question: 'Why should we choose an engineering consultancy over hiring full-time staff?',
      answer:
        'Hiring full-time cloud architects or data engineers involves lengthy recruiting cycles, high salary overhead, and ongoing benefits costs. Salkin Tech provides immediate access to engineering expertise on a flexible, project-driven basis. You get high-caliber execution for your exact technical goals without long-term hiring commitments or overhead.',
    },
    {
      question: 'What is the typical timeline for a cloud or data modernization project?',
      answer:
        'Project timelines depend on system complexity, but most initial cloud infrastructure builds or automated data pipeline modernizations take between 3 to 8 weeks. We begin every project with a clear technical roadmap, milestone schedule, and direct communication to ensure on-time delivery.',
    },
  ];

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    const newIndex = isOpening ? index : null;
    setOpenIndex(newIndex);

    if (isOpening) {
      trackEvent('faq_toggle', {
        question: faqs[index].question,
        index,
      });
    }
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111d13] tracking-tight leading-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our cloud architecture, automated data pipelines, and
            engagement timelines.
          </p>
        </div>

        {/* Accordion container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-[#f3f3f4] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f985d] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                        isOpen ? 'bg-[#5f985d]' : 'bg-gray-400'
                      }`}
                    />
                    <span className="text-base sm:text-lg font-bold text-[#111d13] leading-snug">
                      {faq.question}
                    </span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-200 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#5f985d]' : 'text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-200/60 pl-11">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA helper */}
        <div className="mt-12 text-center p-6 rounded-xl bg-[#f3f3f4] border border-gray-200">
          <p className="text-sm text-gray-700">
            Have a question about your specific architecture or custom requirements?{' '}
            <a
              href="#contact"
              onClick={() =>
                trackEvent('click_cta', {
                  cta_name: 'Ask us directly',
                  cta_location: 'faq_footer',
                })
              }
              className="font-bold text-[#5f985d] hover:underline inline-flex items-center ml-1"
            >
              Ask our engineers directly &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
