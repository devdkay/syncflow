import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

const services = [
  'Website Development',
  'Lead Capture System',
  'Automatic Appointment Booking',
  '24/7 Website AI Assistant',
  'Custom Business Software'
];

// const budgetRanges = [
//   'Under $500',
//   '$500 - $1,000',
//   '$1,000 - $2,500',
//   '$2,500 - $5,000',
//   'Over $5,000'
// ];

// const timelines = [
//   'ASAP (Rush)',
//   'Within 1 week',
//   'Within 2 weeks',
//   'Within 1 month',
//   'No rush'
// ];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    company_website: '' // honeypot field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Pre-select service from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && services.includes(serviceParam)) {
      setFormData(prev => ({
        ...prev,
        service: serviceParam
      }));
    }
  }, []);

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
    setError(null);
    setSuccessMessage('');

    try {
      // Get current page URL
      const pageUrl = window.location.href;

      // Prepare data for API
      const submissionData = {
        fullName: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        pageUrl: pageUrl,
        company_website: formData.company_website // honeypot
      };

      // Submit to our API endpoint
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsLoading(false);
      setSuccessMessage(result.message || 'Request received — check your email for confirmation.');
      setIsSubmitted(true);

      // Reset form
      setFormData({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        company_website: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
      setIsLoading(false);
    }
  };

  const goBack = () => {
    window.location.href = '/';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
        <div className="text-center py-12 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-[#00D4FF] mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
          <p className="text-gray-300 text-lg mb-8">
            {successMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-transparent border border-[#00D4FF] text-[#00D4FF] rounded-lg hover:bg-[#00D4FF] hover:text-white transition-colors"
            >
              Submit Another Request
            </button>
            <button
              onClick={goBack}
              className="neon-button"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white relative">
      {/* Background consistency */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 relative">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goBack}
              className="flex items-center text-white hover:text-[#00D4FF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="text-xl font-bold text-white">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </div>
          </div>
        </div>
      </header>

      {/* Contact Form */}
      <section className="pt-24 pb-20 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Contact <span className="text-[#00D4FF]">SyncFlow</span>
            </h1>
            <p className="text-lg text-gray-300">
              Ready to get started? Fill out the form below and we'll get back to you quickly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="company_website"
              value={formData.company_website}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="neon-button w-full group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}