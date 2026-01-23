import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "I got a well designed website in a day what an amazing platform highly encourage",
    author: "Sarah M.",
    role: "Small Business Owner",
    featured: true
  },
  {
    id: 2,
    text: "Fast delivery and clean design. Very professional.",
    author: "Mike R.",
    role: "Freelancer",
    featured: false
  },
  {
    id: 3,
    text: "Great communication and the website looks modern.",
    author: "Lisa K.",
    role: "Restaurant Owner",
    featured: false
  },
  {
    id: 4,
    text: "Affordable and the process was super easy.",
    author: "David L.",
    role: "Consultant",
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
    <section id="testimonials" className="py-20 px-6 bg-black/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
            What Our <span className="text-[#00D4FF]">Clients Say</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4">Real feedback from real customers</p>
        </div>

        {/* Featured Testimonial */}
        {featuredTestimonial && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center hover:border-[#00D4FF]/50 transition-all duration-300">
              {renderStars()}
              <blockquote className="text-xl sm:text-2xl text-white mb-6 leading-relaxed">
                "{featuredTestimonial.text}"
              </blockquote>
              <div className="text-gray-400">
                <p className="font-semibold text-[#00D4FF]">{featuredTestimonial.author}</p>
                <p className="text-sm">{featuredTestimonial.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Show More Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-transparent border border-[#00D4FF] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF] hover:text-white transition-colors"
          >
            {showAll ? 'Show Less' : 'Show More'}
            {showAll ? (
              <ChevronUp className="ml-2 w-4 h-4" />
            ) : (
              <ChevronDown className="ml-2 w-4 h-4" />
            )}
          </button>
        </div>

        {/* Other Testimonials */}
        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF]/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-4 text-center">
                  "{testimonial.text}"
                </blockquote>
                <div className="text-center text-gray-400">
                  <p className="font-semibold text-[#00D4FF] text-sm">{testimonial.author}</p>
                  <p className="text-xs">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}