import React from 'react';
import { Check, Sparkles, PhoneCall } from 'lucide-react';

const plans = [
  {
    name: 'Smart Web Starter',
    price: '499',
    period: 'one-time setup',
    description: 'Establish a premium web presence with a high-speed, conversion-optimized local business website.',
    features: [
      'Delivered in 24 hours (basic sites)',
      '100% mobile & tablet responsive',
      'Local SEO setup (Halifax / Nova Scotia targeting)',
      'Secure contact & lead capture forms',
      'Domain registration & hosting setup',
      '30 days of post-launch updates'
    ],
    cta: 'Get Smart Web',
    service: 'Website Development',
    popular: false
  },
  {
    name: 'AI Agent & Bookings',
    price: '999',
    period: 'one-time setup',
    description: 'Automate 80% of customer support queries and capture qualified bookings 24/7.',
    features: [
      'Custom-trained AI Chatbot integration',
      'Intelligent Calendar Booking system',
      'Automated client SMS & Email reminders',
      'Lead capture sent straight to your email/CRM',
      'Up to 1,000 AI conversations per month',
      'Full setup & conversational training support'
    ],
    cta: 'Get AI Assistant',
    service: '24/7 Website AI Assistant',
    popular: true
  },
  {
    name: 'Custom Workflow CRM',
    price: '1,499',
    period: 'one-time setup',
    description: 'Connect all your software systems into a single automated pipeline that saves 10+ hours a week.',
    features: [
      'CRM syncing (HubSpot, Salesforce, etc.)',
      'Automated email/SMS follow-up drip campaigns',
      'Invoicing & bookkeeping automation',
      'Custom analytics & tracking dashboard',
      'Dedicated project manager & developer support',
      'Ongoing workflow health audits'
    ],
    cta: 'Get Custom Software',
    service: 'Custom Business Software',
    popular: false
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
    // Open Calendly if active, or scroll to contact
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            Choose a starting tier that fits your business scale. No hidden fees, clear outcome anchors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                plan.popular
                  ? 'bg-gradient-to-b from-gray-900/80 to-gray-950/80 border-[#00D4FF] shadow-xl shadow-[#00D4FF]/10 scale-105 z-10 lg:-translate-y-2'
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
                <p className="text-sm text-gray-400 mb-6 leading-relaxed min-h-[48px]">{plan.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-gray-400 text-lg">$</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-gray-500 text-sm">/ {plan.period}</span>
                </div>

                <div className="border-t border-gray-800/60 pt-6 mb-8">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">What's Included:</p>
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
