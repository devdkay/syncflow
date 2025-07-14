import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
            Terms of <span className="text-[#00D4FF]">Service</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="ml-6">
              By using SyncFlow's services or site, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Services</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We provide AI-powered automation tools and systems
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We may modify or discontinue services at any time with notice
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Provide accurate information
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Do not misuse or attempt unauthorized access to our systems
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                All website content, tools, and branding belong to SyncFlow
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You may not copy or reproduce our content without permission
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Payments & Subscriptions</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Some services may be paid; terms will be provided at checkout
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You are responsible for timely payments
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Liability Disclaimer</h2>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We do our best to ensure uptime and security, but cannot guarantee uninterrupted access
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-[#00D4FF] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                SyncFlow is not liable for indirect or incidental damages
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
            <p className="ml-6">
              These terms are governed by the laws of Canada/Nova Scotia
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
            <p className="ml-6">
              For legal questions, email{' '}
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