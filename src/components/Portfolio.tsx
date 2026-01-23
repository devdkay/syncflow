import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Zap, Phone } from 'lucide-react';

const Portfolio = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    hours: 0,
    satisfaction: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animated counter effect
  useEffect(() => {
    if (!isVisible) return;

    const targets = {
      projects: 50,
      clients: 25,
      hours: 48,
      satisfaction: 100
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        hours: Math.floor(targets.hours * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const projects = [
    {
      id: 1,
      title: "Acadia Launchbox Chatbot",
      description: "Custom chatbot developed for Acadia Launchbox using advanced Voiceflow.com connectors for seamless chatbot building capabilities. Features intelligent conversation flows and real-time integration.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://launchbox.acadiau.ca/",
      linkText: "Visit Live Chatbot",
      tech: ["Voiceflow", "AI Integration", "Real-time Chat"],
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Portfolio Website (Graduate)",
      description: "A clean portfolio website built for a graduate student.",
      image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "[PASTE_PORTFOLIO_LINK_HERE]",
      linkText: "View Website",
      tech: ["Portfolio", "Graduate", "Clean Design"],
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-[#0d0d0d] text-white">
      {/* Impact Section */}
      <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 to-[#FF6B35]/5"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
              Our <span className="text-[#00D4FF]">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">Measurable results that drive business growth</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform">
                  20+
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Projects Completed
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Successful projects delivered
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform">
                  10+
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Clients Served
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Businesses transformed
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform">
                  24h
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Fastest Website Delivery
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Basic websites delivered fast
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform">
                  100%
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  Client Satisfaction
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Success rate achieved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Done Section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 px-4">
              Our <span className="text-[#00D4FF]">Portfolio</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">Real solutions delivered for real businesses</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-gray-900/50 rounded-xl border border-gray-800 hover:border-[#00D4FF]/50 transition-all duration-300 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[#00D4FF]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {project.icon}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-[#00D4FF]/10 text-[#00D4FF] text-sm rounded-full border border-[#00D4FF]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Link */}
                  <a 
                    href={project.link}
                    target={project.link.startsWith('http') ? '_blank' : '_self'}
                    rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-[#00D4FF] hover:text-white transition-colors group/link"
                  >
                    {project.linkText}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;