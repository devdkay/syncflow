import React from 'react';
import { ArrowLeft, Settings, CheckCircle } from 'lucide-react';

const features = [
  'Custom dashboard designed for your business',
  'Customer and client management system',
  'Sales and revenue tracking',
  'Inventory management (if applicable)',
  'Automated reporting and analytics',
  'User roles and permissions',
  'Mobile-friendly interface',
  'Data backup and security'
];

const examples = [
  {
    title: 'Restaurant Management System',
    description: 'Track orders, inventory, staff schedules, and daily sales in one dashboard'
  },
  {
    title: 'Client Project Tracker',
    description: 'Manage client projects, track time, send invoices, and monitor deadlines'
  },
  {
    title: 'Fitness Studio Software',
    description: 'Member management, class scheduling, payment tracking, and attendance records'
  },
  {
    title: 'Real Estate CRM',
    description: 'Lead tracking, property listings, client communications, and deal pipeline'
  }
];

export default function CustomSoftware() {
  const navigateToContact = () => {
    window.location.href = '/contact?service=Custom Business Software';
  };

  const goBack = () => {
    window.location.href = '/';
  };

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
              <div className="flex items-center">
                <div className="h-6 w-6 mr-2 flex items-center justify-center">
                  <img 
                    src="/logo_only.png" 
                    alt="SyncFlow" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-[#00D4FF]">Sync</span>Flow
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Custom Business Software
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We build software made just for your business. Get a dashboard where you can see customers, sales, profits, and overall business progress in one place.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Get Custom Software
          </button>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-black/30 relative z-10">
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
      <section className="py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            Custom Software <span className="text-[#00D4FF]">Examples</span>
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
      <section className="py-16 px-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Ready for Custom Software?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Stop using multiple tools that don't talk to each other. Get one system built specifically for your business.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Get Custom Software
          </button>
        </div>
      </section>
    </div>
  );
}