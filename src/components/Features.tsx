import React from 'react';
import { Mail, Users, Twitter, MessageSquare, Globe, Phone } from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Email Outreach Automation',
    description: 'Auto-find & email leads with personalized templates.'
  },
  {
    icon: Users,
    title: 'Lead Capture + CRM Integration',
    description: 'AI bots collect and organize leads instantly.'
  },
  {
    icon: Twitter,
    title: 'Twitter/X Automation',
    description: 'Stay active and generate leads without lifting a finger.'
  },
  {
    icon: MessageSquare,
    title: '3-in-1 Website Chatbot',
    description: 'Answer FAQs, capture leads, and book appointments.'
  },
  {
    icon: Globe,
    title: 'Website Building',
    description: 'We build high quality websites in 48 hours.'
  },
  {
    icon: Phone,
    title: 'AI Voice Calls',
    description: 'Automated follow-ups & BPO-style interaction with no staff.'
  }
];

export default function Features() {
  return (
    <section id="services" className="py-20 px-6 bg-black/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            What We <span className="text-[#00D4FF]">Offer</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">AI-powered automation solutions for every business need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00D4FF]/20 transition-colors">
                <feature.icon className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}