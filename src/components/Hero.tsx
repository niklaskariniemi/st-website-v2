import React from 'react';
import { ArrowDown, Calendar, Server, Zap, CheckCircle2, Shield } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import heroTeamImage from '../assets/images/desk-vs-cloud.jpg';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#111d13] text-white py-16 sm:py-24 lg:py-28"
    >
      {/* Geometric background grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #5f985d 1px, transparent 1px),
            linear-gradient(to bottom, #5f985d 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#5f985d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 60% Text (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#5f985d] animate-ping" />
              <span className="text-xs sm:text-sm font-mono tracking-wider text-[#5f985d] uppercase font-semibold">
                Cloud &bull; DevOps &bull; Data Modernization
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Software &amp; Cloud Solutions That Drive Business Growth.
            </h1>

            {/* Sub-header Body Copy */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Salkin Tech helps growing businesses automate{' '}
              <strong className="text-white font-semibold">
                Cloud Architecture &amp; Infrastructure
              </strong>
              , modernize slow{' '}
              <strong className="text-white font-semibold">
                Legacy Data Modernization
              </strong>{' '}
              systems, and ship custom web and mobile software, all without the delay,
              risk, or friction of hiring full-time engineering teams.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#services"
                onClick={() =>
                  trackEvent('click_cta', {
                    cta_name: 'Explore Services',
                    cta_location: 'hero_primary',
                  })
                }
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-[6px] transition-all shadow-[0_4px_16px_rgba(95,152,93,0.35)] hover:translate-y-[-1px]"
              >
                Explore Services
                <ArrowDown className="w-5 h-5 ml-2" />
              </a>

              <a
                href="#contact"
                onClick={() =>
                  trackEvent('click_cta', {
                    cta_name: 'Schedule a Call',
                    cta_location: 'hero_secondary',
                  })
                }
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white border-2 border-[#5f985d] hover:bg-[#5f985d]/10 rounded-[6px] transition-all"
              >
                <Calendar className="w-5 h-5 mr-2 text-[#5f985d]" />
                Schedule a Call
              </a>
            </div>

            {/* Micro Guarantees / Value Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d] shrink-0" />
                <span>Zero Downtime Deploys</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d] shrink-0" />
                <span>Zero Idle Compute Costs</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#5f985d] shrink-0" />
                <span>Engineers Only</span>
              </div>
            </div>
          </div>

          {/* Right Column: 40% Visual Stock Container (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#5f985d]/40 via-transparent to-[#5f985d]/20 blur-sm -z-10" />

              <div className="relative rounded-xl overflow-hidden border border-[#5f985d]/40 bg-[#162518] shadow-2xl">
                <img
                  src={heroTeamImage}
                  alt="Salkin Tech team building cloud architecture and infrastructure for modern enterprise client."
                  className="w-full h-auto object-cover aspect-[4/3] block transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Overlay live metric card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#111d13]/90 backdrop-blur-md border border-[#5f985d]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#5f985d]/20 border border-[#5f985d]/50 flex items-center justify-center text-[#5f985d]">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-mono">Infrastructure Status</div>
                      <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#5f985d]"></span>
                        Cloud Run &amp; Serverless Active
                      </div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <div className="text-xs font-mono text-[#5f985d] font-bold">99.99%</div>
                    <div className="text-[11px] text-gray-400">Target Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
