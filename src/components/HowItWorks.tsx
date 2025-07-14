import React from 'react';
import { MessageCircle, Cog, Zap } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Tell us what you want to automate',
    description: 'Share your business processes and automation goals with our AI specialists.'
  },
  {
    icon: Cog,
    title: 'We build a custom AI system',
    description: 'Our team creates tailored automation workflows designed for your specific needs.'
  },
  {
    icon: Zap,
    title: 'You go live — instantly smarter',
    description: 'Launch your AI-powered automation and watch your efficiency soar immediately.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            How It <span className="text-[#00D4FF]">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">Three simple steps to AI-powered automation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00D4FF] to-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#00D4FF] to-transparent"></div>
                )}
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00D4FF] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 group-hover:text-[#00D4FF] transition-colors px-4">
                {step.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}