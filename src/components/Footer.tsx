import { Facebook, Instagram, Linkedin, ShieldAlert, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00D4FF]/2 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Logo & Bio block */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-[#00D4FF]">Sync</span>Flow
            </div>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed text-sm">
              Custom web development & conversational AI agents built to help local businesses in Halifax & Nova Scotia save time, automate scheduling, and secure more leads.
            </p>
            <div className="text-xs text-gray-500 mb-6 leading-relaxed">
              📍 Proudly serving Halifax, Dartmouth, Bedford, Sackville, and all Nova Scotia communities.
            </div>

            {/* Social Block with Prompt */}
            <div className="mb-6 pt-4 border-t border-gray-850">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-3">Check Our Socials:</p>
              <div className="flex space-x-4 mb-3">
                <a
                  href="https://www.instagram.com/syncflow.ca?igsh=MWtmcGYwOWY2Nm9ybw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all"
                  aria-label="Visit SyncFlow on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/18Ay4KBCH6/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all"
                  aria-label="Visit SyncFlow on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/syncflow-ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-[#00D4FF] hover:border-[#00D4FF] transition-all"
                  aria-label="Visit SyncFlow on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                Local businesses buy trust. We publish our client updates, demo walkthroughs, and design samples on Instagram & Facebook.
              </p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Navigation</h4>
            <ul className="space-y-3.5 text-sm">
              <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-[#00D4FF] transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Specialized Services</button></li>
              <li><button onClick={() => scrollToSection('demo')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Interactive Live Demos</button></li>
              <li><button onClick={() => scrollToSection('industries')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Who We Serve</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Pricing & Tiers</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Our Impact & Work</button></li>
            </ul>
          </div>

          {/* Specialized Services Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">AI & Web Services</h4>
            <ul className="space-y-3.5 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Smart Website Starter</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">24/7 AI Support Chatbot</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Conversational Voice Agents</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">E-commerce Web Stores</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-[#00D4FF] transition-colors text-left">Workflow CRM Integrations</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} SyncFlow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="mailto:syncflow.ca@gmail.com" className="text-[#00D4FF] hover:underline">
              syncflow.ca@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}