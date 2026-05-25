import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, ShieldCheck, Building } from 'lucide-react';

const clientLogos = [
  { name: 'Halifax Wellness', industry: 'Health & Clinic' },
  { name: 'Metro Plumbers', industry: 'Home Contractor' },
  { name: 'Coastal Boutique', industry: 'Retail E-com' },
  { name: 'Apex Legal Partners', industry: 'Law Office' },
  { name: 'Bluenose Diner', industry: 'Restaurant' }
];

const testimonials = [
  {
    id: 1,
    text: "SyncFlow completely transformed our appointment booking flow. They built our website and integrated a custom AI assistant. We have seen a 35% increase in online bookings, and our staff saves at least 8 hours a week not answering basic questions. Outstanding delivery speed!",
    author: "Dr. Sarah Jenkins",
    role: "Founder, Halifax Health & Wellness",
    location: "Halifax, NS",
    featured: true
  },
  {
    id: 2,
    text: "We needed a lead capture system that actually worked and connected to our CRM. SyncFlow set up smart popups and quote estimators. Every single lead is now instantly texted back with a scheduler link. Our sales conversion rate literally doubled in 30 days.",
    author: "Marc Leblanc",
    role: "Owner, Metro Plumbing & Heating",
    location: "Dartmouth, NS",
    featured: false
  },
  {
    id: 3,
    text: "SyncFlow delivered our e-commerce storefront in record time. It's lightning-fast on mobile, which is where 80% of our local buyers are. They also integrated our inventory tracking with QuickBooks automatically. Highly recommend!",
    author: "Emily Chen",
    role: "Operations Manager, Coastal Boutique",
    location: "Halifax, NS",
    featured: false
  },
  {
    id: 4,
    text: "As a busy lawyer, I don't have time to build tech. SyncFlow set up our intake automation, document templates, and client database. What used to take our secretary 3 hours now happens in 10 seconds. Worth every penny.",
    author: "Robert Vance, KC",
    role: "Senior Partner, Apex Legal Partners",
    location: "Bedford, NS",
    featured: false
  }
];

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const featuredTestimonial = testimonials.find(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  const renderStars = () => {
    return (
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-black/50 to-black/30 relative overflow-hidden">
      {/* Logos Banner Section */}
      <div className="container mx-auto max-w-6xl mb-24">
        <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
          Trusted by Local Nova Scotia Businesses
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
          {clientLogos.map((client, idx) => (
            <div key={idx} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900/30 border border-gray-850">
              <Building className="w-4 h-4 text-[#00D4FF]" />
              <div className="text-left">
                <span className="text-sm font-bold text-white block">{client.name}</span>
                <span className="text-[10px] text-gray-500 font-semibold">{client.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Body */}
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block text-[#00D4FF] text-sm font-semibold tracking-wider uppercase mb-3">
            Client Success
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-[#00D4FF]">Clients Say</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Hear directly from local business owners who saved hours and secured more customers.
          </p>
        </div>

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 sm:p-10 text-center hover:border-[#00D4FF]/40 transition-all duration-300 relative">
              <div className="absolute top-4 right-6 text-6xl text-[#00D4FF]/10 font-serif pointer-events-none">“</div>
              {renderStars()}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-medium">
                "{featuredTestimonial.text}"
              </blockquote>
              <div className="text-center">
                <p className="text-white font-bold text-base sm:text-lg">{featuredTestimonial.author}</p>
                <p className="text-sm text-gray-400">{featuredTestimonial.role}</p>
                <p className="text-xs text-[#00D4FF] font-semibold mt-1">{featuredTestimonial.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Show More Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3.5 bg-transparent border border-[#00D4FF] text-[#00D4FF] rounded-xl hover:bg-[#00D4FF] hover:text-white transition-colors font-bold text-sm"
          >
            {showAll ? 'Collapse Testimonials' : 'Show All Testimonials'}
            {showAll ? (
              <ChevronUp className="ml-2 w-4 h-4" />
            ) : (
              <ChevronDown className="ml-2 w-4 h-4" />
            )}
          </button>
        </div>

        {/* Other Testimonials */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {otherTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-900/20 border border-gray-850 rounded-xl p-6 hover:border-[#FF6B35]/40 transition-all duration-300 flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 mb-6 text-center text-sm sm:text-base leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                </div>
                <div className="text-center pt-4 border-t border-gray-850/50">
                  <p className="text-white font-bold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                  <p className="text-[10px] text-[#00D4FF] font-semibold mt-0.5">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}