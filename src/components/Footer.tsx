import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 mr-3 flex items-center justify-center">
                  <img 
                    src="/logo_only.png" 
                    alt="SyncFlow" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-[#00D4FF]">Sync</span>Flow
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Websites and automation systems that help small businesses grow and save time.
            </p>
            <div className="mb-6">
              <a 
                href="mailto:syncflow.ca@gmail.com" 
                className="text-[#00D4FF] hover:text-white transition-colors text-sm"
              >
                syncflow.ca@gmail.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00D4FF] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-[#00D4FF] transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors">Services</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-[#00D4FF] transition-colors">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#00D4FF] transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Website Development</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Lead Capture</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">AI Assistant</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Custom Software</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SyncFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}