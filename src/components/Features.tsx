import React from 'react';
import { Globe, Users, Calendar, MessageSquare, Settings } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'We build modern, fast, mobile-friendly websites. Business sites, portfolios, online stores, landing pages, booking sites, blogs, and custom dashboards.',
    shortDescription: 'Professional websites that work on all devices and help your business grow.',
    cta: 'Get My Website',
    service: 'Website Development',
    link: '/website-development'
  },
  {
    icon: Users,
    title: 'Lead Capture System',
    description: 'We set up forms and smart popups to collect leads automatically and send them to your email or CRM.',
    shortDescription: 'Capture more leads with smart forms and popups that work 24/7.',
    cta: 'Capture More Leads',
    service: 'Lead Capture System',
    link: '/lead-capture'
  },
  {
    icon: Calendar,
    title: 'Automatic Appointment Booking',
    description: 'Let customers book directly from your website. We connect calendars and add reminders.',
    shortDescription: 'Let customers book appointments online anytime, with automatic reminders.',
    cta: 'Automate Bookings',
    service: 'Automatic Appointment Booking',
    link: '/appointment-booking'
  },
  {
    icon: MessageSquare,
    title: '24/7 Website AI Assistant',
    description: 'An AI assistant that answers questions, helps customers, and collects leads day and night.',
    shortDescription: 'AI assistant that helps customers and captures leads while you sleep.',
    cta: 'Add AI Assistant',
    service: '24/7 Website AI Assistant',
    link: '/ai-assistant'
  },
  {
    icon: Settings,
    title: 'Custom Business Software',
    description: 'We build software made just for your business. You get a dashboard where you can see customers, services/products sold, profits, and overall business progress in one place.',
    shortDescription: 'Custom software built specifically for your business needs and workflows.',
    cta: 'Get Custom Software',
    service: 'Custom Business Software',
    link: '/custom-software'
  }
];

export default function Features() {
  const navigateToService = (link: string) => {
    window.location.href = link;
  };

  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <section id="services" className="py-20 px-6 bg-black/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            Our <span className="text-[#00D4FF]">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">Simple solutions to help your business grow</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="feature-card group p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00D4FF]/20 transition-colors">
                <service.icon className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigateToService(service.link)}
                  className="px-4 py-2 bg-transparent border border-[#00D4FF] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF] hover:text-white transition-colors text-sm"
                >
                  Learn More
                </button>
                <button
                  onClick={navigateToContact}
                  className="px-4 py-2 bg-[#00D4FF] text-white rounded-lg hover:bg-[#00a8cc] transition-colors text-sm"
                >
                  {service.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}