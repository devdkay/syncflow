import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 to-[#FF6B35]/5"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 px-4">
            About <span className="text-[#00D4FF]">SyncFlow</span>
          </h2>
          
          <div className="space-y-6 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
            <p className="animate-fade-in">
              SyncFlow builds custom AI automation systems that help businesses grow faster 
              without hiring more staff.
            </p>
            
            <p className="animate-fade-in-delay">
              From lead generation and client outreach to chatbot scheduling and voice calls — 
              we automate it all so you can focus on what matters.
            </p>
            
            <p className="animate-fade-in-delay-2">
              Our advanced AI systems work around the clock, ensuring your business never 
              sleeps while you do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}