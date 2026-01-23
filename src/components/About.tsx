import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 to-[#FF6B35]/5"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 px-4">
            About <span className="text-[#00D4FF]">SyncFlow</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed px-4 max-w-3xl mx-auto">
            SyncFlow helps small businesses and individuals build websites and smart systems that bring in customers and save time. We focus on fast delivery, clean design, and simple tools that are easy to use.
          </p>
        </div>
      </div>
    </section>
  );
}