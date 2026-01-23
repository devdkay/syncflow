import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const services = [
  'Website Development',
  'Lead Capture System',
  'Automatic Appointment Booking',
  '24/7 Website AI Assistant',
  'Custom Business Software'
];

const budgetRanges = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  'Over $5,000'
];

const timelines = [
  'ASAP (Rush)',
  'Within 1 week',
  'Within 2 weeks',
  'Within 1 month',
  'No rush'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">Thanks!</h3>
        <p className="text-gray-300 text-lg">
          We received your request and will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Contact <span className="text-[#00D4FF]">SyncFlow</span>
          </h2>
          <p className="text-lg text-gray-300">
            Ready to get started? Fill out the form below and we'll get back to you quickly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="block text-white font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
              placeholder="Enter your full name"
            />
          </div>

          {/* Business Name */}
          <div className="form-group">
            <label htmlFor="businessName" className="block text-white font-medium mb-2">
              Business Name (Optional)
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
              placeholder="Your business name"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="block text-white font-medium mb-2">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
                placeholder="Your phone number"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="form-group">
            <label htmlFor="service" className="block text-white font-medium mb-2">
              Service Needed *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service} className="bg-gray-800">
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message" className="block text-white font-medium mb-2">
              Message / Requirements *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300 resize-none"
              placeholder="Tell us about your project and requirements..."
            />
          </div>

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="budget" className="block text-white font-medium mb-2">
                Budget Range (Optional)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range} className="bg-gray-800">
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeline" className="block text-white font-medium mb-2">
                Timeline (Optional)
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
              >
                <option value="">Select timeline</option>
                {timelines.map((timeline) => (
                  <option key={timeline} value={timeline} className="bg-gray-800">
                    {timeline}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="neon-button w-full group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}