import React from 'react';
import { Globe, Users, Calendar, MessageSquare, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'We build modern, fast, mobile-friendly websites. Business sites, portfolios, online stores, landing pages, booking sites, blogs, and custom dashboards.',
    cta: 'Get My Website',
    service: 'Website Development'
  },
  {
    icon: Users,
    title: 'Lead Capture System',
    description: 'We set up forms and smart popups to collect leads automatically and send them to your email or CRM.',
    cta: 'Capture More Leads',
    service: 'Lead Capture System'
  },
  {
    icon: Calendar,
    title: 'Automatic Appointment Booking',
    description: 'Let customers book directly from your website. We connect calendars and add reminders.',
    cta: 'Automate Bookings',
    service: 'Automatic Appointment Booking'
  },
  {
    icon: MessageSquare,
    title: '24/7 Website AI Assistant',
    description: 'An AI assistant that answers questions, helps customers, and collects leads day and night.',
    cta: 'Add AI Assistant',
    service: '24/7 Website AI Assistant'
  },
  {
    icon: Settings,
    title: 'Custom Business Software',
    description: 'We build software made just for your business. You get a dashboard where you can see customers, services/products sold, profits, and overall business progress in one place.',
    cta: 'Get Custom Software',
    service: 'Custom Business Software'
  }
];

const websiteTypes = [
  {
    title: 'Business & Company Website',
    description: 'A professional website for a local business to show services and get calls/leads.',
    examples: ['Restaurant', 'Cleaning company', 'Agency'],
    sections: ['Home', 'Services', 'About', 'Contact']
  },
  {
    title: 'Personal & Portfolio Website',
    description: 'A personal site to show your work and resume.',
    examples: ['Student', 'Designer', 'Developer'],
    sections: ['About', 'Projects', 'Skills', 'Contact']
  },
  {
    title: 'Online Store (E-Commerce)',
    description: 'A store to sell products online with payments.',
    examples: ['Clothing', 'Beauty', 'Accessories'],
    sections: ['Shop', 'Product pages', 'Cart', 'Checkout']
  },
  {
    title: 'Landing Page / Sales Page',
    description: 'One page designed to get leads fast.',
    examples: ['Ads campaign', 'Product launch', 'Event signups'],
    sections: ['Offer', 'Benefits', 'Form']
  },
  {
    title: 'Service & Booking Website',
    description: 'Customers can book appointments anytime.',
    examples: ['Salon', 'Tutor', 'Clinic'],
    sections: ['Services', 'Booking', 'FAQs']
  },
  {
    title: 'Blog & Content Website',
    description: 'A content website to post articles.',
    examples: ['Travel blog', 'Niche content', 'News'],
    sections: ['Articles', 'Categories', 'Subscribe']
  },
  {
    title: 'Custom Web App / Dashboard',
    description: 'A custom system to manage business info.',
    examples: ['Client tracker', 'Sales tracker'],
    sections: ['Dashboard', 'Reports', 'Admin']
  }
];

export default function Features() {
  const [expandedWebsiteType, setExpandedWebsiteType] = React.useState<number | null>(null);
  const [showWebsiteTypes, setShowWebsiteTypes] = React.useState(false);

  const scrollToContact = (service: string) => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Pre-select the service in the form
      setTimeout(() => {
        const serviceSelect = document.getElementById('service') as HTMLSelectElement;
        if (serviceSelect) {
          serviceSelect.value = service;
        }
      }, 500);
    }
  };

  const toggleWebsiteType = (index: number) => {
    setExpandedWebsiteType(expandedWebsiteType === index ? null : index);
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
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {service.description}
              </p>
              <button
                onClick={() => scrollToContact(service.service)}
                className="mt-6 px-6 py-3 bg-[#00D4FF] text-white font-semibold rounded-lg hover:bg-[#00a8cc] transition-colors"
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Website Types Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Website Types We <span className="text-[#00D4FF]">Build</span>
            </h3>
            <button
              onClick={() => setShowWebsiteTypes(!showWebsiteTypes)}
              className="inline-flex items-center text-[#00D4FF] hover:text-white transition-colors"
            >
              {showWebsiteTypes ? 'Hide' : 'Show'} Website Types
              {showWebsiteTypes ? (
                <ChevronUp className="ml-2 w-5 h-5" />
              ) : (
                <ChevronDown className="ml-2 w-5 h-5" />
              )}
            </button>
          </div>

          {showWebsiteTypes && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF]/50 transition-all duration-300 cursor-pointer"
                  onClick={() => toggleWebsiteType(index)}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {type.title}
                  </h4>
                  
                  {expandedWebsiteType === index ? (
                    <div className="space-y-3">
                      <p className="text-gray-400 text-sm">
                        {type.description}
                      </p>
                      <div>
                        <p className="text-[#00D4FF] text-sm font-medium mb-1">Examples:</p>
                        <p className="text-gray-400 text-sm">
                          {type.examples.join(', ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#00D4FF] text-sm font-medium mb-1">Sections included:</p>
                        <p className="text-gray-400 text-sm">
                          {type.sections.join(', ')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Tap to see details
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}