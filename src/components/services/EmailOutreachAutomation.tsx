import React from 'react';
import { Mail, Target, Zap, BarChart } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function EmailOutreachAutomation() {
  const benefits = [
    "AI-powered lead targeting finds your ideal prospects automatically",
    "Personalized email sequences increase response rates by 300%",
    "Automated follow-ups ensure no lead falls through the cracks"
  ];

  return (
    <ServicePageLayout
      title="Email Outreach Automation"
      tagline="Automate your email outreach, increase conversions effortlessly."
      description="Transform your email marketing with AI-powered automation that finds, targets, and engages your ideal prospects. Our intelligent system crafts personalized email sequences, manages follow-ups, and optimizes send times to maximize your conversion rates while you focus on closing deals."
      benefits={benefits}
      icon={<Mail className="w-12 h-12 text-white" />}
    >
      {/* Additional Features Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Advanced <span className="text-[#00D4FF]">Features</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Smart Targeting</h4>
              <p className="text-gray-400">AI identifies and segments your ideal prospects based on behavior and demographics.</p>
            </div>
            
            <div className="text-center">
              <Zap className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Dynamic Personalization</h4>
              <p className="text-gray-400">Each email is customized with relevant content and timing for maximum impact.</p>
            </div>
            
            <div className="text-center">
              <BarChart className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Performance Analytics</h4>
              <p className="text-gray-400">Real-time insights and optimization recommendations to improve your campaigns.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}