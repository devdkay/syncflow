import React from 'react';
import { Activity, Utensils, Scissors, Hammer, Briefcase, ChevronRight } from 'lucide-react';

const industries = [
  {
    icon: Activity,
    name: 'Clinics & Healthcare',
    example: 'Dental, Chiropractic, Physical Therapy',
    problem: 'Receptionists spend hours playing phone tag to book appointments and fill calendar gaps.',
    solution: '24/7 Web AI assistant and voice receptionist pre-screen patient requests, match open slots, and log them into booking platforms.',
    outcome: '30%+ scheduling efficiency increase.'
  },
  {
    icon: Utensils,
    name: 'Restaurants & Hospitality',
    example: 'Diners, Pizzerias, Fine Dining, Cafes',
    problem: 'Staff missed calls during busy hours, resulting in lost reservations and catering leads.',
    solution: 'AI Voice Receptionist handles incoming reservations, answers FAQ on menu/parking, and texts booking confirmation.',
    outcome: 'Never miss an incoming customer lead.'
  },
  {
    icon: Scissors,
    name: 'Salons, Spas & Wellness',
    example: 'Hair Salons, Barber Shops, Massage Spas',
    problem: 'Last-minute client no-shows and cancellations eat directly into daily profit margins.',
    solution: 'Automated booking portal paired with smart SMS/Email follow-up flow with custom reminder rules.',
    outcome: 'Drop no-shows to near zero percent.'
  },
  {
    icon: Hammer,
    name: 'Home Services & Contractors',
    example: 'Plumbers, Electricians, Roofers, Painters',
    problem: 'Leads buy from the first contractor who replies. Speed-to-lead determines success.',
    solution: 'Smart popups and instant quote estimators text leads back within 60 seconds with a scheduling link.',
    outcome: 'Double lead-to-booking conversions.'
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    example: 'Real Estate Agents, Accountants, Law Firms',
    problem: 'Chasing clients for onboarding documents, questionnaires, and signed files takes hours.',
    solution: 'Automated onboarding portals that collect data, send intake forms, and trigger custom alerts.',
    outcome: 'Save 10+ administration hours per week.'
  }
];

export default function Industries() {
  const handleScrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="industries" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Visual ornaments */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,107,53,0.02),transparent_60%)] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-[#FF6B35] text-sm font-semibold tracking-wider uppercase mb-3">
            Tailored Industry Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Who We <span className="text-[#00D4FF]">Help</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            "Local business" is too broad. We construct specialized automation systems mapped directly to your vertical's bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-12">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-8 rounded-2xl bg-gray-900/20 border border-gray-850 hover:border-[#FF6B35]/40 hover:bg-gray-900/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-850 rounded-xl flex items-center justify-center group-hover:bg-[#FF6B35]/15 transition-all">
                    <ind.icon className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-450 uppercase font-semibold">
                    {ind.example.split(',')[0]}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FF6B35] transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-gray-450 italic mb-4">{ind.example}</p>

                <div className="space-y-3.5 mb-6 text-sm">
                  <div>
                    <span className="text-xs font-bold text-red-400/80 uppercase block mb-1">Critical Bottleneck</span>
                    <p className="text-gray-450 leading-relaxed text-xs sm:text-sm">{ind.problem}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-850/60">
                    <span className="text-xs font-bold text-emerald-400/80 uppercase block mb-1">Our AI Solution</span>
                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{ind.solution}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-850/40 flex items-center justify-between text-xs">
                <span className="font-bold text-[#00D4FF] uppercase tracking-wider">
                  Impact: {ind.outcome}
                </span>
                <button
                  onClick={handleScrollToContact}
                  className="text-gray-400 hover:text-white flex items-center gap-0.5 group/btn font-semibold"
                >
                  Automate
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* Quick custom block */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#00D4FF]/5 to-[#FF6B35]/5 border border-dashed border-gray-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Own another type of business?</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                From real estate staging agencies to HVAC services and regional retail chains, we build custom solutions matching any operational workflow.
              </p>
            </div>
            <button
              onClick={handleScrollToContact}
              className="w-full py-3 bg-transparent border border-white/20 hover:border-[#00D4FF] hover:text-[#00D4FF] text-white text-xs font-bold rounded-xl transition-all"
            >
              Request Custom Industry Assessment
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
