import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white hover:text-[#00D4FF] transition-colors">
            <span className="text-[#00D4FF]">Sync</span>Flow
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="#about" className="text-gray-300 hover:text-[#00D4FF] transition-colors">About</a>
            <a href="#services" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-[#00D4FF] transition-colors">How It Works</a>
            <Link to="/signup" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Contact</Link>
            <Link to="/signup" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Login</Link>
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
              <a href="#about" className="text-gray-300 hover:text-[#00D4FF] transition-colors">About</a>
              <a href="#services" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Services</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-[#00D4FF] transition-colors">How It Works</a>
              <Link to="/signup" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Contact</Link>
              <Link to="/signup" className="text-gray-300 hover:text-[#00D4FF] transition-colors">Login</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}