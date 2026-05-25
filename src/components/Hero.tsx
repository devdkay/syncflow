import { ArrowRight, MapPin, Play } from 'lucide-react';
import AutomationBackground from './AutomationBackground';
import FloatingBubbles from './FloatingBubbles';

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d]">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft top-left cyan glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-[#00D4FF]/5 blur-[120px] animate-glow-slow"></div>
        {/* Soft bottom-right blue glow */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] rounded-full bg-blue-600/5 blur-[150px] animate-glow-slower"></div>
        {/* Dark overlay layer for perfect readability and contrast */}
        <div className="absolute inset-0 bg-radial-vignette opacity-90 z-20"></div>
      </div>

      {/* Interactive Canvas Background */}
      <AutomationBackground />

      {/* Floating Status Bubbles */}
      <FloatingBubbles />

      {/* Content */}
      <div className="relative z-30 text-center px-6 max-w-4xl mx-auto pt-16">
        {/* Geographic Signal Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm mb-6 backdrop-blur-md animate-fade-in">
          <MapPin className="w-4 h-4 text-[#00D4FF] animate-pulse" />
          <span>Serving Halifax, Dartmouth & All of Nova Scotia</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight px-4 animate-fade-in-delay">
          Custom Websites & <br className="hidden sm:inline" />
          <span className="text-[#00D4FF]">AI Automation</span> for Small Businesses
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto px-4 animate-fade-in-delay-2">
          Get more leads, automate booking calendars, and save 10+ hours per week with systems that work for you 24/7.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={scrollToContact}
            className="neon-button group inline-flex items-center"
          >
            Get Free Trial
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('demo')}
            className="px-8 py-4 bg-gray-900/40 border-2 border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:border-[#00D4FF] hover:shadow-lg hover:shadow-[#00D4FF]/20 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-[#00D4FF] fill-current" />
            See Live Demo
          </button>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-gray-400 text-sm sm:text-base px-4">
          <span className="flex items-center gap-1">⏱️ Basic sites in 24 hours</span>
          <span className="text-gray-600">•</span>
          <span>📈 2x lead capture rate guaranteed</span>
          <span className="text-gray-600">•</span>
          <span>💼 Tailored local business pricing</span>
        </div>
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