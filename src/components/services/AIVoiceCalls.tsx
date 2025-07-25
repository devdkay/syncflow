import React from 'react';
import { Phone, Mic, Brain, Users } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function AIVoiceCalls() {
  const benefits = [
    "Human-like conversations that build trust and rapport with clients",
    "24/7 availability ensures no missed opportunities or calls",
    "Automated follow-ups and appointment setting without human intervention"
  ];

  return (
    <ServicePageLayout
      title="AI Voice Calls"
      tagline="Human-like AI calls for client engagement and support."
      description="Deploy sophisticated AI voice agents that conduct natural, engaging phone conversations with your prospects and customers. Our advanced voice AI handles follow-ups, appointment scheduling, customer support, and lead qualification with human-like warmth and professionalism, operating around the clock."
      benefits={benefits}
      icon={<Phone className="w-12 h-12 text-white" />}
    >
      {/* Voice AI Capabilities Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Advanced <span className="text-[#00D4FF]">Capabilities</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mic className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Natural Speech</h4>
              <p className="text-gray-400">Advanced voice synthesis creates conversations indistinguishable from human agents.</p>
            </div>
            
            <div className="text-center">
              <Brain className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Intelligent Responses</h4>
              <p className="text-gray-400">AI understands context and responds appropriately to complex customer inquiries.</p>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Scalable Support</h4>
              <p className="text-gray-400">Handle unlimited concurrent calls without additional staffing costs.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}