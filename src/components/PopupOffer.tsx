import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PopupOffer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup was shown today
    const lastShown = localStorage.getItem('syncflow-popup-shown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember that popup was shown today
    localStorage.setItem('syncflow-popup-shown', new Date().toDateString());
  };

  const handleGetTrial = () => {
    handleClose();
    // Scroll to contact form and pre-select Website Development
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = 'Website Development';
        }
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Get One Week Free Trial
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Get your website and use it for one week. If you like it, then pay — you surely will.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleGetTrial}
              className="neon-button flex-1"
            >
              Get Free Trial
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors flex-1"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}