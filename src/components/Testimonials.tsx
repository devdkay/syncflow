import React, { useEffect, useState } from 'react';
import { Building, ChevronDown, ChevronUp, Loader2, Send, ShieldCheck, Star } from 'lucide-react';
import { hasSupabaseConfig, supabase, TestimonialReview } from '../lib/supabase';

const clientLogos = [
  { name: 'Halifax Wellness', industry: 'Health & Clinic' },
  { name: 'Metro Plumbers', industry: 'Home Contractor' },
  { name: 'Coastal Boutique', industry: 'Retail E-com' },
  { name: 'Apex Legal Partners', industry: 'Law Office' },
  { name: 'Bluenose Diner', industry: 'Restaurant' },
];

const defaultTestimonials = [
  {
    id: 1,
    text: 'SyncFlow completely transformed our appointment booking flow. They built our website and integrated a custom AI assistant. We have seen a 35% increase in online bookings, and our staff saves at least 8 hours a week not answering basic questions. Outstanding delivery speed!',
    author: 'Dr. Sarah Jenkins',
    company: 'Halifax Health & Wellness',
    role: 'Founder',
    location: 'Halifax, NS',
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    text: 'We needed a lead capture system that actually worked and connected to our CRM. SyncFlow set up smart popups and quote estimators. Every single lead is now instantly texted back with a scheduler link. Our sales conversion rate literally doubled in 30 days.',
    author: 'Marc Leblanc',
    company: 'Metro Plumbing & Heating',
    role: 'Owner',
    location: 'Dartmouth, NS',
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    text: "SyncFlow delivered our e-commerce storefront in record time. It's lightning-fast on mobile, which is where 80% of our local buyers are. They also integrated our inventory tracking with QuickBooks automatically. Highly recommend!",
    author: 'Emily Chen',
    company: 'Coastal Boutique',
    role: 'Operations Manager',
    location: 'Halifax, NS',
    rating: 5,
    featured: false,
  },
  {
    id: 4,
    text: "As a busy lawyer, I don't have time to build tech. SyncFlow set up our intake automation, document templates, and client database. What used to take our secretary 3 hours now happens in 10 seconds. Worth every penny.",
    author: 'Robert Vance, KC',
    company: 'Apex Legal Partners',
    role: 'Senior Partner',
    location: 'Bedford, NS',
    rating: 5,
    featured: false,
  },
];

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const [approvedReviews, setApprovedReviews] = useState<TestimonialReview[]>([]);
  const [reviewForm, setReviewForm] = useState({
    clientName: '',
    businessName: '',
    role: '',
    location: '',
    email: '',
    rating: 5,
    review: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      return;
    }

    supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.warn('Unable to load approved testimonials:', error.message);
          return;
        }

        setApprovedReviews((data || []) as TestimonialReview[]);
      });
  }, []);

  const submittedTestimonials = approvedReviews.map((review) => ({
    id: review.id || review.client_name,
    text: review.review,
    author: review.client_name?.trim() || 'SyncFlow client',
    company: review.business_name?.trim() || '',
    role: review.role?.trim() || '',
    location: review.location?.trim() || '',
    rating: review.rating,
    featured: Boolean(review.featured),
  }));

  const testimonials = [...submittedTestimonials, ...defaultTestimonials];
  const featuredTestimonial = testimonials.find(t => t.featured);
  const otherTestimonials = testimonials.filter(t => !t.featured);

  const handleReviewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewMessage(null);
    setReviewError(null);

    try {
      if (hasSupabaseConfig) {
        const { error } = await supabase
          .from('testimonials')
          .insert({
            client_name: reviewForm.clientName,
            business_name: reviewForm.businessName || null,
            role: reviewForm.role || null,
            location: reviewForm.location || null,
            email: reviewForm.email || null,
            rating: reviewForm.rating,
            review: reviewForm.review,
            status: 'pending',
            featured: false,
          });

        if (error) throw error;
      } else {
        console.log('Review awaiting approval:', reviewForm);
      }

      setReviewMessage('Thank you for sharing your experience with SyncFlow.');
      setReviewForm({
        clientName: '',
        businessName: '',
        role: '',
        location: '',
        email: '',
        rating: 5,
        review: '',
      });
    } catch (err: unknown) {
      setReviewError(getErrorMessage(err, 'Unable to submit your review. Please try again.'));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStars = (rating = 5, size = 'w-5 h-5') => (
    <div className="flex justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );

  const renderAttribution = (testimonial: {
    author: string;
    company?: string;
    role?: string;
    location?: string;
  }, compact = false) => {
    const roleAndCompany = [testimonial.role, testimonial.company].filter(Boolean).join(', ');

    return (
      <div className="text-center">
        <p className={`text-white font-bold ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
          {testimonial.author}
        </p>
        {roleAndCompany && (
          <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-300`}>
            {roleAndCompany}
          </p>
        )}
        {testimonial.location && (
          <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-[#00D4FF] font-semibold mt-1`}>
            {testimonial.location}
          </p>
        )}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-black/50 to-black/30 relative overflow-hidden">
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

        {featuredTestimonial && (
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 sm:p-10 text-center hover:border-[#00D4FF]/40 transition-all duration-300 relative">
              <div className="absolute top-4 right-6 text-6xl text-[#00D4FF]/10 font-serif pointer-events-none">"</div>
              {renderStars(featuredTestimonial.rating)}
              <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-medium">
                "{featuredTestimonial.text}"
              </blockquote>
              {renderAttribution(featuredTestimonial)}
            </div>
          </div>
        )}

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

        {showAll && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            {otherTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-900/20 border border-gray-850 rounded-xl p-6 hover:border-[#FF6B35]/40 transition-all duration-300 flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  {renderStars(testimonial.rating, 'w-4 h-4')}
                  <blockquote className="text-gray-300 mb-6 text-center text-sm sm:text-base leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-gray-850/50">
                  {renderAttribution(testimonial, true)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          <div className="pt-2">
            <div className="inline-block text-[#FF6B35] text-sm font-semibold tracking-wider uppercase mb-3">
              Share Your Result
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Write a <span className="text-[#00D4FF]">Client Review</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Reviews are checked by SyncFlow before they appear publicly, so every featured story stays useful, accurate, and client-approved.
            </p>
          </div>

          <form onSubmit={handleReviewSubmit} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-5">
            {reviewMessage && (
              <div className="rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 p-4 text-sm text-[#00D4FF]">
                {reviewMessage}
              </div>
            )}
            {reviewError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {reviewError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="clientName" className="block text-sm font-semibold text-white mb-2">Name *</label>
                <input id="clientName" name="clientName" value={reviewForm.clientName} onChange={handleReviewInputChange} required className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="businessNameReview" className="block text-sm font-semibold text-white mb-2">Business</label>
                <input id="businessNameReview" name="businessName" value={reviewForm.businessName} onChange={handleReviewInputChange} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" placeholder="Business name" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-white mb-2">Role</label>
                <input id="role" name="role" value={reviewForm.role} onChange={handleReviewInputChange} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" placeholder="Owner, founder, manager..." />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-white mb-2">Location</label>
                <input id="location" name="location" value={reviewForm.location} onChange={handleReviewInputChange} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" placeholder="Halifax, NS" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-5">
              <div>
                <label htmlFor="reviewEmail" className="block text-sm font-semibold text-white mb-2">Email</label>
                <input id="reviewEmail" name="email" type="email" value={reviewForm.email} onChange={handleReviewInputChange} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]" placeholder="For verification only" />
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-semibold text-white mb-2">Rating</label>
                <select id="rating" name="rating" value={reviewForm.rating} onChange={handleReviewInputChange} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating} className="bg-gray-800">{rating} stars</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-white mb-2">Review *</label>
              <textarea id="review" name="review" value={reviewForm.review} onChange={handleReviewInputChange} required rows={4} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] resize-none" placeholder="What changed for your business after working with SyncFlow?" />
            </div>

            <button type="submit" disabled={isSubmittingReview} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#00D4FF] to-[#FF6B35] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#00D4FF]/30 disabled:opacity-60">
              {isSubmittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              Share Your Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
