import React, { useState } from 'react';
import { Menu, X, Instagram, Facebook, Linkedin, PhoneCall } from 'lucide-react';
import { openCalendlyPopup } from '../lib/calendly';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleBookCall = () => {
    openCalendlyPopup();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/80">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo and Local Tag */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-xl sm:text-2xl font-bold text-white">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Services</button>
            <button onClick={() => scrollToSection('demo')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Live Demos</button>
            <button onClick={() => scrollToSection('industries')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Industries</button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Impact</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors">Reviews</button>
          </nav>

          {/* Socials & Call CTA Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-3 border-r border-gray-800 pr-4">
              <a
                href="https://www.instagram.com/syncflow.ca?igsh=MWtmcGYwOWY2Nm9ybw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D4FF] transition-colors"
                aria-label="Visit Syncflow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/18Ay4KBCH6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D4FF] transition-colors"
                aria-label="Visit Syncflow on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/syncflow-ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D4FF] transition-colors"
                aria-label="Visit Syncflow on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Contact Button */}
            <button
              onClick={handleBookCall}
              className="px-5 py-2.5 bg-gradient-to-r from-[#00D4FF] to-[#00a8cc] hover:from-white hover:to-white text-black font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-[#00D4FF]/10 flex items-center gap-1.5 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              Book Call
            </button>
          </div>

          {/* Mobile Actions Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Services</button>
              <button onClick={() => scrollToSection('demo')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Live Demos</button>
              <button onClick={() => scrollToSection('industries')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Industries</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Pricing Packages</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Our Impact</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-semibold text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Client Reviews</button>

              {/* Mobile CTA */}
              <button
                onClick={handleBookCall}
                className="w-full py-3 bg-[#00D4FF] text-black font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                Book Free Call
              </button>

              {/* Mobile Social Links */}
              <div className="flex items-center gap-5 pt-4 border-t border-gray-850 justify-center">
                <a href="https://www.instagram.com/syncflow.ca?igsh=MWtmcGYwOWY2Nm9ybw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00D4FF]">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/share/18Ay4KBCH6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00D4FF]">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/company/syncflow-ca/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00D4FF]">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
