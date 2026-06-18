import React from 'react';
import { Check, Sparkles, PhoneCall } from 'lucide-react';
import { openCalendlyPopup } from '../lib/calendly';

const plans = [
  {
    name: 'Business Launch Website',
    price: '399',
    period: 'one-time setup',
    description: 'Get a professional website that turns visitors into customers.',
    features: [
      'Delivered in 3-5 business days',
      'Mobile & tablet optimized',
      'Lead capture/contact forms',
      'Local SEO setup',
      'Domain & hosting setup',
      'Google Business Profile integration',
      '30 days support'
    ],
    cta: 'Launch My Website',
    service: 'Website Development',
    popular: false,
    startingAt: false
  },
  {
    name: '24/7 AI Booking Assistant',
    price: '799',
    period: 'one-time setup',
    description: 'Never miss another lead, even when you are sleeping.',
    features: [
      'AI assistant trained on your business',
      'Website chat integration',
      'Instant lead qualification',
      'Calendar booking automation',
      'SMS & email reminders',
      'CRM lead capture',
      'Up to 1,000 conversations/month',
      'Full setup & training'
    ],
    cta: 'Get More Bookings',
    service: '24/7 Website AI Assistant',
    popular: false,
    startingAt: false
  },
  {
    name: 'Growth Package',
    price: '1,199',
    period: 'one-time setup',
    description: 'Everything you need to generate and convert leads automatically.',
    features: [
      'Professional Website',
      'AI Booking Assistant',
      'Lead Capture Forms',
      'Calendar Automation',
      'SMS & Email Reminders',
      'CRM Integration',
      '60 Days Support'
    ],
    cta: 'Start Growing',
    service: 'Website Development',
    popular: true,
    startingAt: false
  },
  {
    name: 'Business Automation System',
    price: '1,299',
    period: 'one-time setup',
    description: 'Replace repetitive work with automated systems.',
    features: [
      'CRM implementation',
      'Automated lead nurturing',
      'Email & SMS workflows',
      'Invoicing automation',
      'Client onboarding automation',
      'Analytics dashboard',
      'Workflow consulting',
      'Dedicated support'
    ],
    cta: 'Automate My Business',
    service: 'Custom Business Software',
    popular: false,
    startingAt: true
  }
];

export default function Pricing() {
  const handlePlanSelection = (serviceName: string) => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = serviceName;
        }
      }, 500);
    }
  };

  const handleBookCall = () => {
    openCalendlyPopup();
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-[#00D4FF] text-sm font-semibold tracking-wider uppercase mb-3">
            Simple & Transparent Tiers
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Pricing <span className="text-[#00D4FF]">Packages</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the system that helps you launch faster, capture better leads, and automate the follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                plan.popular
                  ? 'bg-gradient-to-b from-gray-900/95 to-gray-950/95 border-[#00D4FF] shadow-2xl shadow-[#00D4FF]/15 xl:scale-[1.04] z-10 xl:-translate-y-3'
                  : 'bg-gray-900/30 border-gray-800/80 hover:border-gray-700 hover:scale-[1.01]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00D4FF] to-[#00a8cc] text-black font-extrabold text-xs px-4 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed md:min-h-[66px] xl:min-h-[88px]">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.startingAt && (
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                      Starting at
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-400 text-lg">$</span>
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  </div>
                  <span className="mt-1 block text-gray-500 text-sm">{plan.period}</span>
                </div>

                <div className="border-t border-gray-800/60 pt-6 mb-8">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Included:</p>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm text-gray-350">
                        <Check className="w-4 h-4 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-800/40">
                <button
                  onClick={() => handlePlanSelection(plan.service)}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-[#00D4FF] hover:bg-white text-black shadow-lg shadow-[#00D4FF]/20 active:scale-95'
                      : 'bg-gray-800 hover:bg-gray-700 text-white active:scale-95'
                  }`}
                >
                  {plan.cta}
                </button>
                <button
                  onClick={handleBookCall}
                  className="w-full py-3 rounded-xl border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Book Free 15-Min Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center py-6 bg-gray-900/10 border border-gray-850 rounded-xl max-w-2xl mx-auto px-6">
          <p className="text-sm text-gray-400 leading-relaxed">
            💡 <strong>Need something custom?</strong> We build bespoke software, automated invoice triggers, and custom AI agents scaled for franchises. <button onClick={handleBookCall} className="text-[#00D4FF] hover:underline font-bold">Contact us for a custom quote.</button>
          </p>
        </div>
      </div>
    </section>
  );
}
