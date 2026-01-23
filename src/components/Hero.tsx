import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Pre-select "Website Development" in the form
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = 'Website Development';
        }
      }, 500);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        
        <div className="circuit-animation"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight px-4">
          Websites and Automation Systems for{' '}
          <span className="text-[#00D4FF]">Small Businesses</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
          We build websites, lead capture, booking systems, and a 24/7 AI assistant to help you get more customers and save time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <button 
            onClick={scrollToContact}
            className="neon-button group inline-flex items-center"
          >
            Get Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => scrollToSection('services')}
            className="px-8 py-4 bg-transparent border-2 border-[#00D4FF] text-[#00D4FF] font-semibold rounded-full transition-all duration-300 hover:bg-[#00D4FF] hover:text-white hover:scale-105 active:scale-95 inline-flex items-center"
          >
            See Services
          </button>
        </div>
        
        <p className="text-gray-400 text-sm sm:text-base px-4 mb-8">
          Basic websites delivered in 24 hours.
        </p>
        
        <p className="text-gray-400 text-base sm:text-lg px-4">
          Built for small businesses, freelancers, and growing teams.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-[#00D4FF] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#00D4FF] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}