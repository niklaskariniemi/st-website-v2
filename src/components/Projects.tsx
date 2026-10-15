import React from 'react';
import { CheckCircle2, TrendingUp, Cpu, BarChart3, Smartphone } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import mediaProjectImg from '../assets/images/desk-vs-cloud-centered.jpg';
import analyticsProjectImg from '../assets/images/desk-vs-report.jpg';
import cuedProjectImg from '../assets/images/cued-phone-frame.jpg';

export const Projects: React.FC = () => {
  const projects = [
    {
      id: 'media-processing',
      category: 'Cloud Automation Project',
      icon: Cpu,
      title: 'Automated Real-Time Media Ingestion Engine',
      subTagline: 'Automated file processing with zero idle compute costs.',
      narrative:
        'Designed and developed a reliable system to process, optimize, and validate high-density files instantly without paying expensive monthly server fees when systems were idle. We engineered an automated file ingestion workflow using Serverless Infrastructure & Cloud Run.',
      milestones: [
        {
          title: 'Zero-Cost Idle Scaling',
          desc: 'System scales from zero when inactive up to 50+ workers during traffic surges.',
        },
        {
          title: 'Automated Reliability',
          desc: 'Built-in automatic retry handling and error isolation to prevent data loss.',
        },
        {
          title: 'Secure Deployment',
          desc: 'Automated CI/CD Pipeline Security & Automation using GitHub Actions with vulnerability scanning.',
        },
      ],
      statValue: '$0',
      statLabel: 'Idle Server Costs (Pay only when files are actively processed)',
      image: mediaProjectImg,
      alt: 'Serverless cloud media ingestion pipeline project engineered by Salkin Tech.',
      reverse: false,
    },
    {
      id: 'erp-analytics',
      category: 'Data Modernization Project',
      icon: BarChart3,
      title: 'Enterprise ERP to Cloud Analytics Engine',
      subTagline:
        'Transforming slow legacy database reports into real-time business insights.',
      narrative:
        'An enterprise business was suffering from operational delays because critical delivery reports required hours of manual data extraction from an outdated ERP system. We modernized their workflow by building an automated pipeline that extracts, cleans, and loads business data directly into modern cloud storage.',
      milestones: [
        {
          title: 'Data Modernization',
          desc: 'Replaced manual batch exports with automated Data Engineering & Automated ETL workflows.',
        },
        {
          title: 'Secure System Access',
          desc: 'Deployed dedicated cloud proxy layers to safely connect legacy systems to modern cloud infrastructure.',
        },
        {
          title: 'Executive Dashboards',
          desc: 'Created automated BigQuery Analytics & BI Dashboards in Looker Studio for instant delivery tracking.',
        },
      ],
      statValue: '100%',
      statLabel: 'Reduction in Data Processing Latency (From hours to minutes)',
      image: analyticsProjectImg,
      alt: 'Automated BigQuery BI analytics dashboard project reducing data latency by 100 percent.',
      reverse: true,
    },
    {
      id: 'cued-platform',
      category: 'Custom App Development Project',
      icon: Smartphone,
      title: 'Cued: High-Concurrency Entertainment Application',
      subTagline:
        'Real-time data synchronization for thousands of concurrent users.',
      narrative:
        'We architected a custom digital platform designed to search, track, and sync thousands of media titles in real-time. Built specifically for high concurrency, the application delivers instantaneous search results and release updates without slowing down under heavy user traffic.',
      milestones: [
        {
          title: 'Custom App Architecture',
          desc: 'Delivered a high-performance application built with modern web and mobile frameworks.',
        },
        {
          title: 'Smart Data Indexing',
          desc: 'Structured flexible database schemas designed for ultra-fast, low-latency search queries.',
        },
        {
          title: 'High Availability',
          desc: 'Engineered for smooth performance during high-volume customer usage spikes.',
        },
      ],
      statValue: '< 100ms',
      statLabel:
        'Average Query Response Time across thousands of live records',
      image: cuedProjectImg,
      alt: 'Custom cloud application development project for Cued insights platform.',
      reverse: false,
    },
  ];

  return (
    <section id="projects" className="bg-white py-20 sm:py-28 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Header */}
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#5f985d] uppercase mb-3">
            PROVEN RESULTS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111d13] tracking-tight leading-tight">
            Engineered Solutions &amp; Featured Client Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Real outcomes built for high concurrency, zero downtime, and measurable cost reduction.
          </p>
        </div>

        {/* Vertical alternating project rows */}
        <div className="space-y-20 lg:space-y-28">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  proj.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Column (7 cols) */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-center ${
                    proj.reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#5f985d]" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5f985d]">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111d13] tracking-tight mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold text-[#5f985d] mb-4">
                    {proj.subTagline}
                  </p>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    {proj.narrative}
                  </p>

                  {/* Milestones list */}
                  <div className="space-y-3 mb-8">
                    {proj.milestones.map((m) => (
                      <div key={m.title} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#5f985d] shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm">
                          <span className="font-bold text-gray-900">{m.title}: </span>
                          <span className="text-gray-600">{m.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metric Callout Box */}
                  <div className="bg-[#f3f3f4] rounded-lg p-5 border-l-4 border-l-[#5f985d] border border-gray-200/80 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#111d13] font-mono tracking-tight">
                        {proj.statValue}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600">
                        {proj.statLabel}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#5f985d]/10 text-[#5f985d] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Visual Image Column (5 cols) */}
                <div
                  className={`lg:col-span-5 ${
                    proj.reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-[#f3f3f4]">
                    <img
                      src={proj.image}
                      alt={proj.alt}
                      className="w-full h-auto object-cover aspect-[16/10] hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
