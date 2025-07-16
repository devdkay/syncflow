import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Spline Animation */}
        <div className="absolute inset-0 w-full h-full">
          <spline-viewer 
            url="https://prod.spline.design/BIcbKMPiPPM4hq7z/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              opacity: '0.6'
            }}
          ></spline-viewer>
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        <div className="circuit-animation"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight px-4">
          AI Systems That Work —{' '}
          <span className="text-[#00D4FF]">While You Don't</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
          Custom automation systems that handle outreach, booking, and operations — 24/7.
        </p>
        
        <Link to="/signup" className="neon-button group mb-8 inline-flex items-center">
          Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <p className="text-gray-400 text-base sm:text-lg px-4">
          Built for startups, solo founders, and growing teams.
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