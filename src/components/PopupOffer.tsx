import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { hasSupabaseConfig, PopupSettings, supabase } from '../lib/supabase';
import { scrollToSiteSection } from '../lib/siteSections';

const defaultPopupSettings: PopupSettings = {
  enabled: true,
  delay_seconds: 3,
  eyebrow: 'Limited Offer',
  title: 'Get One Week Free Trial',
  description: 'Get your website and use it for one week. If you like it, then pay - you surely will.',
  primary_button_enabled: true,
  primary_button_label: 'Get Free Trial',
  primary_button_target_section: 'contact',
  secondary_button_enabled: true,
  secondary_button_label: 'View Packages',
  secondary_button_target_section: 'pricing',
};

export default function PopupOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState<PopupSettings>(defaultPopupSettings);

  useEffect(() => {
    let isMounted = true;
    let timer: number | undefined;

    const loadPopupSettings = async () => {
      let nextSettings = defaultPopupSettings;

      if (hasSupabaseConfig) {
        const { data, error } = await supabase
          .from('popup_settings')
          .select('*')
          .eq('enabled', true)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.warn('Unable to load popup settings:', error.message);
        }

        if (data) {
          nextSettings = data as PopupSettings;
        }
      }

      if (!isMounted || !nextSettings.enabled) return;

      setSettings(nextSettings);
      timer = window.setTimeout(() => {
        if (isMounted) setIsVisible(true);
      }, Math.max(nextSettings.delay_seconds, 0) * 1000);
    };

    loadPopupSettings();

    return () => {
      isMounted = false;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleButtonAction = (targetSection: string) => {
    handleClose();
    window.setTimeout(() => scrollToSiteSection(targetSection), 150);
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
          {settings.eyebrow && (
            <div className="mb-4 inline-flex rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
              {settings.eyebrow}
            </div>
          )}
          <h3 className="text-2xl font-bold text-white mb-4">
            {settings.title}
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {settings.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {settings.primary_button_enabled && (
              <button
                onClick={() => handleButtonAction(settings.primary_button_target_section)}
                className="neon-button flex-1 justify-center"
              >
                {settings.primary_button_label}
              </button>
            )}
            {settings.secondary_button_enabled && (
              <button
                onClick={() => handleButtonAction(settings.secondary_button_target_section)}
                className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors flex-1"
              >
                {settings.secondary_button_label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
