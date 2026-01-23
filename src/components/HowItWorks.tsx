import React from 'react';
import { FileText, Phone, MessageCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Fill Out the Form',
    description: 'Tell us what you need and share your details.'
  },
  {
    icon: Phone,
    title: 'We Contact You',
    description: 'We reply with next steps and a quick plan.'
  },
  {
    icon: MessageCircle,
    title: 'Discovery Call',
    description: 'We discuss pricing, features, and timeline.'
  },
  {
    icon: Rocket,
    title: 'Build, Review, Launch',
    description: 'We build it, you review it, we launch it live.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
            How It <span className="text-[#00D4FF]">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">Four simple steps to get your solution</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00D4FF] to-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#00D4FF] to-transparent"></div>
                )}
                
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00D4FF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 group-hover:text-[#00D4FF] transition-colors px-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed px-2">
                {step.description}
              </p>
              
              {index === 2 && (
                <p className="text-xs text-[#00D4FF] mt-2 px-2">
                  For basic websites, delivery can be within 24 hours.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}