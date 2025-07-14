import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-gray-800 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              AI automation systems that work around the clock, so you don't have to.
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
              <li><a href="#about" className="text-gray-400 hover:text-[#00D4FF] transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#00D4FF] transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-[#00D4FF] transition-colors">How It Works</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[#00D4FF] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-[#00D4FF] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-[#00D4FF] transition-colors">Terms of Service</Link></li>
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