import React from 'react';

const stats = [
  {
    number: '+500',
    label: 'Workflows Automated',
    description: 'Custom automation systems deployed'
  },
  {
    number: '+30%',
    label: 'Efficiency Boost',
    description: 'Average productivity increase'
  },
  {
    number: '24/7',
    label: 'Automated Client Response',
    description: 'Round-the-clock AI assistance'
  }
];

export default function Stats() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            Our <span className="text-[#00D4FF]">Impact</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">Results that speak for themselves</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}