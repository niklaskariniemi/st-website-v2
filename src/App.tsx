import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Ecosystem } from './components/Ecosystem';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnalyticsInspector } from './components/AnalyticsInspector';
import { SheetsCrmModal } from './components/SheetsCrmModal';
import { LegalModals } from './components/LegalModals';
import { initGA, trackPageView, trackEvent } from './lib/analytics';
import { Calendar, MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [crmOpen, setCrmOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'sitemap' | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics 4
    initGA();
    trackPageView(window.location.pathname + window.location.hash);

    // Initial check for #crm or #admin hash
    if (window.location.hash === '#crm' || window.location.hash === '#admin') {
      setCrmOpen(true);
    }

    // Track hash changes as virtual pageviews
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#hero';
      if (currentHash === '#crm' || currentHash === '#admin') {
        setCrmOpen(true);
      }
      trackPageView(window.location.pathname + currentHash, `Salkin Tech - ${currentHash}`);
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('scroll_to_top');
  };

  return (
    <div className="min-h-screen bg-[#111d13] text-gray-900 flex flex-col font-sans selection:bg-[#5f985d]/30 selection:text-white">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Sections based on wireframe */}
      <main className="flex-1">
        <Hero />
        <Services />
        <Projects />
        <Ecosystem />
        <About />
        <FAQ />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenCrm={() => setCrmOpen(true)}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Mobile Floating Action Bar (Responsive Mobile UX) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2">
        <a
          href="#contact"
          onClick={() => trackEvent('click_cta', { cta_name: 'Mobile Floating Inquire' })}
          className="flex-1 py-3 px-4 rounded-xl bg-[#5f985d] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Start Consultation</span>
        </a>

        <a
          href="https://calendar.app.google/k8GcJ2Sap7bE4EBp6"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('click_calendar_consultation', { location: 'mobile_floating_bar' })}
          className="p-3 rounded-xl bg-[#162518] text-white border border-[#5f985d]/40 shadow-xl flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Schedule Call"
        >
          <Calendar className="w-5 h-5 text-[#5f985d]" />
        </a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden sm:flex fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#162518]/90 text-[#5f985d] border border-[#5f985d]/40 hover:bg-[#5f985d] hover:text-white shadow-xl backdrop-blur-md transition-all duration-300"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Google Sheets Leads CRM Modal */}
      <SheetsCrmModal
        isOpen={crmOpen}
        onClose={() => setCrmOpen(false)}
      />

      {/* Google Analytics 4 & Resend Live Debug Inspector */}
      <AnalyticsInspector
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
      />

      {/* Privacy Policy / Terms / Sitemap Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
