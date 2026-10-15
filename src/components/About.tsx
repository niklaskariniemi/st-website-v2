import React from 'react';
import { Award, ShieldAlert, Cpu, Target, CheckCircle2 } from 'lucide-react';
import archPlanningImage from '../assets/images/desk-cloud-report-person.jpg';

export const About: React.FC = () => {
  const guarantees = [
    {
      title: 'Engineering Precision',
      desc: 'Work directly with cloud architects and data engineers.',
      icon: Cpu,
    },
    {
      title: 'Production-First Standards',
      desc: 'Every system we design is built with automated security, error isolation, and 24/7 reliability built-in from day one.',
      icon: Award,
    },
    {
      title: 'Focus on Business Value',
      desc: "We do not build technology for technology's sake. Every project is scoped to deliver clear ROI—whether that means cutting cloud bills, reducing data latency by 75%, or launching products faster.",
      icon: Target,
    },
  ];

  return (
    <section id="about" className="bg-[#f3f3f4] py-20 sm:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stock Image Container (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-xl bg-white">
                <img
                  src={archPlanningImage}
                  alt="Salkin Tech engineering team planning cloud architecture and legacy data modernization."
                  className="w-full h-auto object-cover aspect-[4/3] block"
                  loading="lazy"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#111d13] text-white p-4 sm:p-5 rounded-xl border border-[#5f985d]/40 shadow-2xl max-w-xs">
                <div className="text-xs font-mono text-[#5f985d] uppercase font-bold tracking-wider mb-1">
                  Philosophy
                </div>
                <div className="text-sm font-semibold leading-snug">
                  Zero Technical Debt. Measured ROI in Every Sprint.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & Core Guarantees (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
              ABOUT US
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111d13] tracking-tight leading-tight mb-6">
              Engineering-Led. Production-Tested. Built for Growth.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed mb-8">
              <p>
                At Salkin Tech, we operate as a specialized engineering agency dedicated to helping
                growing organizations modernize their tech stack without administrative friction. We
                combine deep computer science fundamentals with hands-on experience building
                production software from the ground up.
              </p>
              <p>
                Whether you are looking to replace slow legacy reporting tools, automate your
                deployment pipelines to eliminate downtime, or launch a resilient cloud application,
                we bring a practical, automation-first approach to every client partnership.
              </p>
            </div>

            {/* Core Guarantees List */}
            <div className="space-y-5 pt-4 border-t border-gray-300/80">
              {guarantees.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-[#5f985d] flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Icon className="w-4 h-4 text-[#5f985d]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#111d13]">
                        {index + 1}. {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
