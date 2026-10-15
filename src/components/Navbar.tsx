import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface NavbarProps {
  onOpenAnalytics?: () => void;
  onOpenCrm?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (link: { label: string; href: string }) => {
    trackEvent('nav_click', {
      nav_item: link.label,
      target_href: link.href,
    });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111d13] border-b border-[#5f985d]/30 backdrop-blur-md bg-[#111d13]/95 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => trackEvent('logo_click', { location: 'navbar' })}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5f985d] rounded"
          >
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-tight flex items-center">
                Salkin <span className="text-[#5f985d] ml-1.5 font-semibold">Tech</span>
              </span>
              <span className="text-[10px] tracking-wider text-gray-400 uppercase font-mono">
                Cloud &bull; DevOps &bull; Data
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-[#18291b] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={() =>
                trackEvent('click_cta', {
                  cta_name: 'Get In Touch',
                  cta_location: 'navbar',
                })
              }
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-[6px] transition-all shadow-[0_2px_10px_rgba(95,152,93,0.3)] hover:shadow-[0_4px_16px_rgba(95,152,93,0.45)]"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-gray-300 hover:text-white hover:bg-[#162518] focus:outline-none focus:ring-2 focus:ring-[#5f985d]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#5f985d]/30 bg-[#111d13] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="block px-3 py-3 text-base font-medium text-gray-200 hover:text-white hover:bg-[#162518] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-800 space-y-3">
            <a
              href="#contact"
              onClick={() => {
                trackEvent('click_cta', {
                  cta_name: 'Get In Touch',
                  cta_location: 'mobile_nav',
                });
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-[#5f985d] hover:bg-[#4e824c] rounded-lg transition-colors"
            >
              Get In Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>

            <div className="flex items-center justify-between px-2 pt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5f985d]" />
                Enterprise Security Standards
              </span>
              <span className="font-mono text-gray-400">Phoenix, AZ</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
