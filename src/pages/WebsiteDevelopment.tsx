import React from 'react';
import { ArrowLeft, Globe, CheckCircle } from 'lucide-react';

const websiteTypes = [
  {
    title: 'Business & Company Website',
    description: 'A professional website for a local business to show services and get calls/leads.',
    examples: ['Restaurant', 'Cleaning company', 'Agency'],
    sections: ['Home', 'Services', 'About', 'Contact']
  },
  {
    title: 'Personal & Portfolio Website',
    description: 'A personal site to show your work and resume.',
    examples: ['Student', 'Designer', 'Developer'],
    sections: ['About', 'Projects', 'Skills', 'Contact']
  },
  {
    title: 'Online Store (E-Commerce)',
    description: 'A store to sell products online with payments.',
    examples: ['Clothing', 'Beauty', 'Accessories'],
    sections: ['Shop', 'Product pages', 'Cart', 'Checkout']
  },
  {
    title: 'Landing Page / Sales Page',
    description: 'One page designed to get leads fast.',
    examples: ['Ads campaign', 'Product launch', 'Event signups'],
    sections: ['Offer', 'Benefits', 'Form']
  },
  {
    title: 'Service & Booking Website',
    description: 'Customers can book appointments anytime.',
    examples: ['Salon', 'Tutor', 'Clinic'],
    sections: ['Services', 'Booking', 'FAQs']
  },
  {
    title: 'Blog & Content Website',
    description: 'A content website to post articles.',
    examples: ['Travel blog', 'Niche content', 'News'],
    sections: ['Articles', 'Categories', 'Subscribe']
  },
  {
    title: 'Custom Web App / Dashboard',
    description: 'A custom system to manage business info.',
    examples: ['Client tracker', 'Sales tracker'],
    sections: ['Dashboard', 'Reports', 'Admin']
  }
];

const features = [
  'Mobile-friendly design that works on all devices',
  'Fast loading speed for better user experience',
  'Search engine optimized (SEO) for Google visibility',
  'Contact forms and lead capture built-in',
  'Professional design that builds trust',
  'Easy to update content management',
  'Secure hosting and SSL certificate included',
  'Basic analytics to track visitors'
];

export default function WebsiteDevelopment() {
  const [expandedType, setExpandedType] = React.useState<number | null>(null);

  const navigateToContact = () => {
    window.location.href = '/contact?service=Website Development';
  };

  const goBack = () => {
    window.location.href = '/';
  };

  const toggleType = (index: number) => {
    setExpandedType(expandedType === index ? null : index);
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
            <Globe className="w-8 h-8 text-[#00D4FF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Website Development
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We build modern, fast, mobile-friendly websites that help your business grow. From simple business sites to complex online stores, we create websites that work.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Get My Website
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

      {/* Website Types */}
      <section className="py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            Website Types We <span className="text-[#00D4FF]">Build</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-[#00D4FF]/50 transition-all duration-300 cursor-pointer"
                onClick={() => toggleType(index)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {type.title}
                </h3>
                
                {expandedType === index ? (
                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm">
                      {type.description}
                    </p>
                    <div>
                      <p className="text-[#00D4FF] text-sm font-medium mb-1">Examples:</p>
                      <p className="text-gray-400 text-sm">
                        {type.examples.join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#00D4FF] text-sm font-medium mb-1">Sections included:</p>
                      <p className="text-gray-400 text-sm">
                        {type.sections.join(', ')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Tap to see details
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Ready to Get Your Website?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Basic websites delivered in 24 hours. Let's build something great together.
          </p>
          <button
            onClick={navigateToContact}
            className="neon-button"
          >
            Get My Website
          </button>
        </div>
      </section>
    </div>
  );
}