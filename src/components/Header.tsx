import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center">
              <img 
                src="/logo_only.png" 
                alt="SyncFlow" 
                className="h-full w-full object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.3))' }}
              />
            </div>
            <span className="ml-2 text-xl sm:text-2xl font-bold text-white">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-[#00D4FF] transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#00D4FF] transition-colors">Services</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-[#00D4FF] transition-colors">Portfolio</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-[#00D4FF] transition-colors">Testimonials</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-[#00D4FF] transition-colors">Contact</button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Testimonials</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-[#00D4FF] transition-colors text-left">Contact</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}