import React from 'react';
import { Settings, Puzzle, Rocket, Code } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function CustomAutomations() {
  const benefits = [
    "Tailored solutions designed specifically for your unique business needs",
    "Seamless integration with your existing tools and workflows",
    "Scalable automation that grows with your business requirements"
  ];

  return (
    <ServicePageLayout
      title="Custom Automations"
      tagline="Automation solutions designed exclusively for your business."
      description="Every business is unique, and so are its automation needs. Our expert team creates bespoke automation solutions tailored to your specific workflows, integrating seamlessly with your existing tools and processes to deliver maximum efficiency and ROI for your particular industry and business model."
      benefits={benefits}
      icon={<Settings className="w-12 h-12 text-white" />}
    >
      {/* Custom Solutions Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Bespoke <span className="text-[#00D4FF]">Solutions</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Puzzle className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Perfect Integration</h4>
              <p className="text-gray-400">Custom-built to work flawlessly with your existing software and processes.</p>
            </div>
            
            <div className="text-center">
              <Rocket className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Rapid Deployment</h4>
              <p className="text-gray-400">Fast implementation with minimal disruption to your current operations.</p>
            </div>
            
            <div className="text-center">
              <Code className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Advanced Logic</h4>
              <p className="text-gray-400">Complex automation workflows that handle your most challenging business processes.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}