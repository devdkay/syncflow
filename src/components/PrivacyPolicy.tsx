import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link to="/" className="inline-flex items-center text-[#00D4FF] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-[#00D4FF]">Policy</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Full name, email address, and business details submitted through forms
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Service preferences and usage data
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Technical data like IP address and browser type (for analytics)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To provide and improve our automation services
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                To contact you about your inquiry or subscription
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                For analytics, security, and operational improvements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Sharing Your Information</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We do not sell your personal data
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We may use trusted third-party tools (e.g. CRM, email platforms)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Your Rights</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You can request access, correction, or deletion of your personal data
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You may opt out of promotional emails anytime
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
            <p className="ml-6">
              We use secure encryption and storage methods to protect your data
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
            <p className="ml-6">
              We use cookies to enhance site experience and measure performance
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p className="ml-6">
              If you have questions about this policy, email us at:{' '}
              <a 
                href="mailto:syncflow.ca@gmail.com" 
                className="text-[#00D4FF] hover:text-white transition-colors"
              >
                syncflow.ca@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}