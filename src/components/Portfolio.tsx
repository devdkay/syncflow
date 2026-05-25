import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Zap, Smartphone, Sparkles, TrendingUp, MessageSquare, Utensils, LineChart } from 'lucide-react';

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
      projects: 34,
      clients: 22,
      hours: 24,
      satisfaction: 100
    };

    const duration = 1500; // 1.5 seconds
    const steps = 50;
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
      metric: "Voiceflow • AI Integration",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "https://launchbox.acadiau.ca/",
      linkText: "Launch Chatbot",
      tech: ["Voiceflow", "AI Integration", "Real-time Chat"],
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Full-Stack Restaurant Web Application",
      description: "A responsive restaurant web application built using a modern frontend and backend stack, featuring dynamic menu management, integrated pickup and delivery ordering flows, and an intuitive user interface.",
      metric: "Modern Web • Stripe Checkout",
      image: "https://res.cloudinary.com/dnikymzht/image/upload/v1773941235/Screenshot_2026-03-19_142553_xuxezq.png",
      link: "https://daawatkitchen.ca",
      linkText: "Explore Restaurant Site",
      tech: ["React / Node.js", "Stripe Payment", "Menu Management"],
      icon: <Utensils className="w-6 h-6" />
    },
    {
      id: 3,
      title: "TradeMetrics - Trading Journal & Analytics Platform",
      description: "Built a full-stack trading journal and analytics platform to help traders track performance beyond profit and improve decision-making. Features structured journaling with market analysis, emotion tracking, risk calculation, and real-time dashboards.",
      metric: "Full-Stack SaaS • Supabase Stack",
      image: "https://res.cloudinary.com/dnikymzht/image/upload/v1777908111/equityCurve_TradeMetrics_xrzuio.png",
      link: "https://trademetrics.trade",
      linkText: "Launch TradeMetrics",
      tech: ["SaaS UI", "Supabase Backend", "Auth", "Charts"],
      icon: <LineChart className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-[#0d0d0d] text-white">
      {/* Impact Section */}
      <section id="portfolio" ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/5 to-[#FF6B35]/5 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block text-[#00D4FF] text-sm font-semibold tracking-wider uppercase mb-3">
              Measurable Success
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4">
              Our Local <span className="text-[#00D4FF]">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">Driving quantifiable growth for businesses in Nova Scotia.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#00D4FF] mb-3 group-hover:scale-105 transition-transform">
                  {counters.projects}+
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Projects Completed
                </h3>
                <p className="text-xs text-gray-400">
                  Custom systems delivered successfully
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#00D4FF] mb-3 group-hover:scale-105 transition-transform">
                  {counters.clients}+
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Clients Served
                </h3>
                <p className="text-xs text-gray-400">
                  Local businesses empowered
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#00D4FF] mb-3 group-hover:scale-105 transition-transform">
                  {counters.hours}h
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Fastest Web Launch
                </h3>
                <p className="text-xs text-gray-400">
                  Speedy landing page setup
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="stats-card p-6 sm:p-8 rounded-xl bg-gray-900/30 border border-gray-850 hover:border-[#00D4FF]/50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#00D4FF] mb-3 group-hover:scale-105 transition-transform">
                  {counters.satisfaction}%
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Client Satisfaction
                </h3>
                <p className="text-xs text-gray-400">
                  5-star reviews on every delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Done Section */}
      <section className="py-24 px-6 bg-black/40 border-t border-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block text-[#FF6B35] text-sm font-semibold tracking-wider uppercase mb-3">
              Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 px-4">
              Featured <span className="text-[#00D4FF]">Work</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">Real results built for businesses in Halifax, Dartmouth & Bedford.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-gray-900/20 rounded-2xl border border-gray-850 hover:border-[#00D4FF]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Trust Metric Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#FF6B35] text-black font-extrabold text-xs rounded-full flex items-center gap-1 shadow-md shadow-[#FF6B35]/20">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {project.metric}
                  </div>

                  <div className="absolute top-4 right-4 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm text-[#00D4FF]">
                    {project.icon}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 bg-[#00D4FF]/5 text-[#00D4FF] text-xs font-semibold rounded border border-[#00D4FF]/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Link */}
                    {project.link.startsWith('http') ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#00D4FF] hover:text-white transition-colors group/link text-sm font-bold"
                      >
                        {project.linkText}
                        <ExternalLink className="ml-1.5 w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          const targetId = project.link.substring(1);
                          const element = document.getElementById(targetId);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="inline-flex items-center text-[#00D4FF] hover:text-white transition-colors group/link text-sm font-bold bg-transparent border-none cursor-pointer p-0"
                      >
                        {project.linkText}
                        <ExternalLink className="ml-1.5 w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
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