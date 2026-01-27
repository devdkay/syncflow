import React from 'react';
import { ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react';

const features = [
  'AI chatbot that answers common questions instantly',
  'Lead capture through natural conversations',
  'Appointment booking through chat interface',
  'Product recommendations and support',
  'Multilingual support for global customers',
  'Integration with your business knowledge base',
  'Escalation to human support when needed',
  'Analytics on customer questions and behavior'
];

const examples = [
  {
    title: 'Restaurant AI Assistant',
    description: 'Answers menu questions, takes reservations, and provides hours and location info'
  },
  {
    title: 'E-commerce Support Bot',
    description: 'Helps customers find products, tracks orders, and handles returns and exchanges'
  },
  {
    title: 'Service Business Bot',
    description: 'Qualifies leads, provides service quotes, and schedules consultations'
  },
  {
    title: 'Healthcare Assistant',
    description: 'Answers common health questions, schedules appointments, and provides office info'
  }
];

export default function AIAssistant() {
  const navigateToContact = () => {
    window.location.href = '/contact?service=24/7 Website AI Assistant';
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
              <span className="text-[#00D4FF]">Sync</span>Flow
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            24/7 Website AI Assistant
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            An AI assistant that answers questions, helps customers, and collects leads day and night. Never miss a potential customer again.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Add AI Assistant
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
            AI Assistant <span className="text-[#00D4FF]">Examples</span>
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
            Ready for 24/7 Customer Support?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Let AI handle customer questions while you sleep. Capture leads and provide support around the clock.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Add AI Assistant
          </button>
        </div>
      </section>
    </div>
  );
}