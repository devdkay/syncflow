import React from 'react';
import { MessageSquare, Clock, Users, Calendar } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function WebsiteChatbot() {
  const benefits = [
    "24/7 customer support reduces response time to under 30 seconds",
    "Intelligent lead qualification captures high-intent prospects",
    "Seamless appointment booking eliminates scheduling back-and-forth"
  ];

  return (
    <ServicePageLayout
      title="3-in-1 Website Chatbot"
      tagline="Your 24/7 virtual assistant for lead capture and scheduling."
      description="Deploy a sophisticated AI chatbot that handles customer inquiries, captures qualified leads, and books appointments automatically. Our intelligent system learns from every interaction, providing personalized responses while seamlessly integrating with your existing tools and workflows."
      benefits={benefits}
      icon={<MessageSquare className="w-12 h-12 text-white" />}
    >
      {/* Chatbot Capabilities Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Triple <span className="text-[#00D4FF]">Functionality</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">FAQ Automation</h4>
              <p className="text-gray-400">Instantly answers common questions with accurate, helpful responses 24/7.</p>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Lead Qualification</h4>
              <p className="text-gray-400">Intelligently identifies and captures high-quality prospects through conversation.</p>
            </div>
            
            <div className="text-center">
              <Calendar className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Smart Booking</h4>
              <p className="text-gray-400">Automatically schedules appointments based on your availability and preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}