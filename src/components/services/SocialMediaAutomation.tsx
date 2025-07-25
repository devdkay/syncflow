import React from 'react';
import { Twitter, Linkedin, Calendar, TrendingUp } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function SocialMediaAutomation() {
  const benefits = [
    "Consistent posting schedule keeps your brand visible 24/7",
    "AI-generated content matches your brand voice perfectly",
    "Automated engagement builds relationships while you sleep"
  ];

  return (
    <ServicePageLayout
      title="Social Media Automation"
      tagline="Stay active and grow your online presence automatically."
      description="Maintain a powerful social media presence without the daily grind. Our AI-powered system creates engaging content, schedules posts at optimal times, and manages interactions across Twitter/X and LinkedIn, helping you build authority and generate leads while focusing on your core business."
      benefits={benefits}
      icon={<Twitter className="w-12 h-12 text-white" />}
    >
      {/* Platform Features Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Platform <span className="text-[#00D4FF]">Coverage</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Twitter className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Twitter/X Mastery</h4>
              <p className="text-gray-400">Automated tweets, replies, and thread creation to build your thought leadership.</p>
            </div>
            
            <div className="text-center">
              <Linkedin className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">LinkedIn Growth</h4>
              <p className="text-gray-400">Professional content creation and networking automation for B2B success.</p>
            </div>
            
            <div className="text-center">
              <Calendar className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Smart Scheduling</h4>
              <p className="text-gray-400">AI determines optimal posting times based on your audience's activity patterns.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}