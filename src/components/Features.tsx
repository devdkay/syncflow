import React from 'react';
import { Globe, MessageSquare, PhoneCall, Calendar, ShoppingBag, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Smart Websites & Development',
    outcome: 'High-speed business sites built to convert local traffic into loyal customers.',
    description: 'We design and build lightning-fast, mobile-responsive websites tailored to local Halifax business owners.',
    cta: 'Get My Website',
    service: 'Website Development',
    link: '/website-development'
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbot Integration',
    outcome: 'Automate 80% of customer support queries 24/7.',
    description: 'Provide instant, automated replies on your site, capture leads during off-hours, and reduce support burden.',
    cta: 'Get AI Chatbot',
    service: '24/7 Website AI Assistant',
    link: '/ai-assistant'
  },
  {
    icon: PhoneCall,
    title: 'AI Voice Agent',
    outcome: 'Never miss a phone call or booking again with human-like voice agents.',
    description: 'Deploy advanced conversational voice AI to handle incoming customer calls, schedule bookings, and capture leads.',
    cta: 'Get Voice Agent',
    service: 'Custom Software',
    link: '/custom-software'
  },
  {
    icon: Calendar,
    title: 'Booking System Automation',
    outcome: 'Seamless automated scheduling that converts website visits to appointments.',
    description: 'Automate scheduling, eliminate email tag, and send automated email/SMS reminders to prevent client no-shows.',
    cta: 'Automate Bookings',
    service: 'Automatic Appointment Booking',
    link: '/appointment-booking'
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Solutions',
    outcome: 'Complete online stores optimized for maximum conversions and local sales.',
    description: 'Build premium digital storefronts with secure checkouts, local delivery setup, and conversion analytics.',
    cta: 'Build E-commerce',
    service: 'Website Development',
    link: '/website-development'
  },
  {
    icon: Cpu,
    title: 'Custom Automation & CRM',
    outcome: 'Sync your CRM, email campaigns, and invoicing to save 10+ hours per week.',
    description: 'Connect disjointed systems (CRM, Gmail, QuickBooks) into automated workflows that handle manual tasks.',
    cta: 'Get Custom Automation',
    service: 'Custom Business Software',
    link: '/custom-software'
  }
];

export default function Features() {
  const navigateToService = (link: string) => {
    window.location.href = link;
  };

  const navigateToContact = (serviceName: string) => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = serviceName;
        }
      }, 500);
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle glowing mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.03),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-[#00D4FF] text-sm font-semibold tracking-wider uppercase mb-3">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            Our Specialized <span className="text-[#00D4FF]">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Tailored digital tools and AI integrations built for high performance and local search dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="feature-card group p-6 sm:p-8 rounded-2xl bg-gray-900/30 border border-gray-800/80 hover:border-[#00D4FF]/50 transition-all duration-300 hover:transform hover:scale-[1.03] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-[#00D4FF]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00D4FF]/20 transition-colors">
                  <service.icon className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                {/* Outcome Statement */}
                <div className="text-xs font-bold text-[#FF6B35] mb-4 uppercase tracking-wider">
                  Outcome: {service.outcome}
                </div>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-800/60">
                <button
                  onClick={() => navigateToService(service.link)}
                  className="flex-1 px-4 py-2.5 bg-transparent border border-gray-700 text-gray-300 rounded-lg hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all text-sm font-semibold"
                >
                  Learn More
                </button>
                <button
                  onClick={() => navigateToContact(service.service)}
                  className="flex-1 px-4 py-2.5 bg-[#00D4FF] text-black rounded-lg hover:bg-white hover:text-black transition-all text-sm font-bold flex items-center justify-center gap-1"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}