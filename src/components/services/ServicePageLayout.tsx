import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ServicePageLayoutProps {
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export default function ServicePageLayout({
  title,
  tagline,
  description,
  benefits,
  icon,
  children
}: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-white hover:text-[#00D4FF] transition-colors">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </Link>
            <Link 
              to="/#services" 
              className="inline-flex items-center text-gray-300 hover:text-[#00D4FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="circuit-animation"></div>
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00D4FF] to-[#FF6B35] rounded-full flex items-center justify-center animate-pulse">
              {icon}
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#00D4FF] mb-8 animate-fade-in-delay">
            {tagline}
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-6 bg-black/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed animate-fade-in">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 animate-fade-in">
            Key <span className="text-[#00D4FF]">Benefits</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-delay"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-[#00D4FF]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00D4FF]/20 transition-colors">
                  <div className="w-3 h-3 bg-[#00D4FF] rounded-full"></div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#00D4FF]/10 to-[#FF6B35]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 animate-fade-in">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in-delay">
            Transform your business with AI-powered automation today.
          </p>
          <Link 
            to="/signup" 
            className="neon-button group animate-fade-in-delay-2 inline-flex items-center"
          >
            Get This Service
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Additional Content */}
      {children}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
            <span className="text-[#00D4FF]">Sync</span>Flow
          </Link>
          <p className="text-gray-400 mb-4">
            AI automation systems that work around the clock, so you don't have to.
          </p>
          <a 
            href="mailto:syncflow.ca@gmail.com" 
            className="text-[#00D4FF] hover:text-white transition-colors"
          >
            syncflow.ca@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}