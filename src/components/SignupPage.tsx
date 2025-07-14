import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  'Email Outreach Automation',
  'Lead Capture + CRM Integration',
  'Twitter/X Automation',
  '3-in-1 Website Chatbot',
  'Appointment Booking System',
  'AI Voice Calls',
  'Other'
];

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    service: '',
    customService: '',
    needs: '',
    discoveryCall: 'yes'
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

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      discoveryCall: value
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
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-[#00D4FF] mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Thanks for reaching out to SyncFlow. We'll get in touch with you shortly.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="neon-button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="circuit-animation"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 px-4">
            Get Started with <span className="text-[#00D4FF]">SyncFlow</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 px-4">
            Tell us about your automation needs and we'll create a custom solution for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
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
              className="form-input w-full px-3 sm:px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300 text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
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
              className="form-input w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
              placeholder="Enter your email address"
            />
          </div>

          {/* Service Selection */}
          <div className="form-group">
            <label htmlFor="service" className="block text-white font-medium mb-2">
              Service Interested In *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="form-input w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service} className="bg-gray-800">
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Service Input */}
          {formData.service === 'Other' && (
            <div className="form-group">
              <label htmlFor="customService" className="block text-white font-medium mb-2">
                Please specify
              </label>
              <input
                type="text"
                id="customService"
                name="customService"
                value={formData.customService}
                onChange={handleInputChange}
                className="form-input w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300"
                placeholder="Describe the service you need"
              />
            </div>
          )}

          {/* Needs Description */}
          <div className="form-group">
            <label htmlFor="needs" className="block text-white font-medium mb-2">
              Describe Your Needs
            </label>
            <textarea
              id="needs"
              name="needs"
              value={formData.needs}
              onChange={handleInputChange}
              rows={4}
              className="form-input w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all duration-300 resize-none"
              placeholder="Tell us more about your automation goals and current challenges..."
            />
          </div>

          {/* Discovery Call */}
          <div className="form-group">
            <label className="block text-white font-medium mb-3">
              Interested in a Discovery Call?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="discoveryCall"
                  value="yes"
                  checked={formData.discoveryCall === 'yes'}
                  onChange={() => handleRadioChange('yes')}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                  formData.discoveryCall === 'yes' 
                    ? 'border-[#00D4FF] bg-[#00D4FF]' 
                    : 'border-gray-600'
                }`}>
                  {formData.discoveryCall === 'yes' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="discoveryCall"
                  value="no"
                  checked={formData.discoveryCall === 'no'}
                  onChange={() => handleRadioChange('no')}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                  formData.discoveryCall === 'no' 
                    ? 'border-[#00D4FF] bg-[#00D4FF]' 
                    : 'border-gray-600'
                }`}>
                  {formData.discoveryCall === 'no' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-300">No</span>
              </label>
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
                Processing...
              </div>
            ) : (
              <>
                Submit Request
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}