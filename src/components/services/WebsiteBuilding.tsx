import React from 'react';
import { Globe, Zap, Smartphone, Code } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function WebsiteBuilding() {
  const benefits = [
    "Professional, custom-designed websites delivered in just 48 hours",
    "Mobile-responsive design that looks perfect on all devices",
    "SEO-optimized structure to help your business get found online"
  ];

  return (
    <ServicePageLayout
      title="Website Building"
      tagline="Get your professional website within 48 hours."
      description="Transform your online presence with a stunning, professional website built specifically for your business. Our expert team creates custom, mobile-responsive websites that not only look amazing but also drive conversions and help you stand out from the competition - all delivered within 48 hours."
      benefits={benefits}
      icon={<Globe className="w-12 h-12 text-white" />}
    >
      {/* Website Features Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Professional <span className="text-[#00D4FF]">Features</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Lightning Fast Delivery</h4>
              <p className="text-gray-400">Professional websites designed and deployed within 48 hours guaranteed.</p>
            </div>
            
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Mobile Responsive</h4>
              <p className="text-gray-400">Perfectly optimized for all devices - desktop, tablet, and mobile.</p>
            </div>
            
            <div className="text-center">
              <Code className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Custom Development</h4>
              <p className="text-gray-400">Tailored design and functionality built specifically for your business needs.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}