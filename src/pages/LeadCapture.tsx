import React from 'react';
import { ArrowLeft, Users, CheckCircle } from 'lucide-react';

const features = [
  'Smart contact forms that capture visitor information',
  'Exit-intent popups to catch leaving visitors',
  'Timed popups that appear at the right moment',
  'Lead magnets like free downloads or guides',
  'Email integration with your current system',
  'CRM integration (HubSpot, Salesforce, etc.)',
  'Automatic email notifications for new leads',
  'Lead tracking and analytics dashboard'
];

const examples = [
  {
    title: 'Restaurant Lead Capture',
    description: 'Popup offering "10% off your first order" in exchange for email signup'
  },
  {
    title: 'Service Business Forms',
    description: 'Contact forms that ask for specific service needs and budget'
  },
  {
    title: 'E-commerce Newsletter',
    description: 'Exit popup offering discount code for email subscribers'
  },
  {
    title: 'Consultation Booking',
    description: 'Form that captures contact info and schedules free consultation'
  }
];

export default function LeadCapture() {
  const navigateToContact = () => {
    window.location.href = '/contact?service=Lead Capture System';
  };

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Lead Capture System
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Turn your website visitors into customers with smart forms and popups that capture leads automatically and send them straight to your email or CRM.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Capture More Leads
          </button>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            What's <span className="text-[#00D4FF]">Included</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            Lead Capture <span className="text-[#00D4FF]">Examples</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF]/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-400">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Ready to Capture More Leads?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Stop losing potential customers. Let's set up a lead capture system that works 24/7.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Capture More Leads
          </button>
        </div>
      </section>
    </div>
  );
}