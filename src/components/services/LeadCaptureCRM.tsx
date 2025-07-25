import React from 'react';
import { Users, Database, Workflow, Shield } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function LeadCaptureCRM() {
  const benefits = [
    "Instant lead capture from multiple channels with zero manual work",
    "Seamless CRM integration keeps your sales pipeline organized",
    "Automated lead scoring prioritizes your hottest prospects"
  ];

  return (
    <ServicePageLayout
      title="Lead Capture + CRM Integration"
      tagline="Never lose a lead again."
      description="Capture every potential customer with our intelligent lead management system. From website visitors to social media interactions, our AI bots instantly collect, organize, and sync leads directly to your CRM, ensuring no opportunity slips through the cracks while maintaining perfect data hygiene."
      benefits={benefits}
      icon={<Users className="w-12 h-12 text-white" />}
    >
      {/* Integration Partners Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Seamless <span className="text-[#00D4FF]">Integrations</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Database className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">CRM Sync</h4>
              <p className="text-gray-400">Works with Salesforce, HubSpot, Pipedrive, and 50+ other CRM platforms.</p>
            </div>
            
            <div className="text-center">
              <Workflow className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Multi-Channel Capture</h4>
              <p className="text-gray-400">Collect leads from websites, social media, emails, and phone calls automatically.</p>
            </div>
            
            <div className="text-center">
              <Shield className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Data Protection</h4>
              <p className="text-gray-400">Enterprise-grade security ensures your lead data is always protected and compliant.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}