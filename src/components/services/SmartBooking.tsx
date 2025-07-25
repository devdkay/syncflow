import React from 'react';
import { Calendar, Clock, Smartphone, FolderSync as Sync } from 'lucide-react';
import ServicePageLayout from './ServicePageLayout';

export default function SmartBooking() {
  const benefits = [
    "AI-powered scheduling eliminates double bookings and conflicts",
    "Automated reminders reduce no-shows by up to 80%",
    "Multi-platform integration syncs with all your existing tools"
  ];

  return (
    <ServicePageLayout
      title="Smart Booking System"
      tagline="Simplify scheduling for you and your clients."
      description="Transform your appointment scheduling with an intelligent system that handles everything automatically. From initial booking to follow-up reminders, our AI manages your calendar, optimizes time slots, and ensures seamless coordination between you and your clients across all devices and platforms."
      benefits={benefits}
      icon={<Calendar className="w-12 h-12 text-white" />}
    >
      {/* Booking Features Section */}
      <section className="py-16 px-6 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Smart <span className="text-[#00D4FF]">Features</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Intelligent Scheduling</h4>
              <p className="text-gray-400">AI optimizes your calendar for maximum efficiency and minimal conflicts.</p>
            </div>
            
            <div className="text-center">
              <Smartphone className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Mobile Optimization</h4>
              <p className="text-gray-400">Seamless booking experience across all devices with instant confirmations.</p>
            </div>
            
            <div className="text-center">
              <Sync className="w-12 h-12 text-[#00D4FF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Calendar Sync</h4>
              <p className="text-gray-400">Integrates with Google, Outlook, and other calendar platforms automatically.</p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}