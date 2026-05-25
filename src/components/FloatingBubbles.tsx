import React from 'react';
import { MessageSquare, UserCheck, CalendarCheck, Clock, Sparkles } from 'lucide-react';

interface BubbleProps {
  text: string;
  icon: React.ReactNode;
  dotColor: string;
  positionClass: string;
  animationClass: string;
}

const bubbles: BubbleProps[] = [
  {
    text: "New lead captured",
    icon: <UserCheck className="w-3.5 h-3.5 text-emerald-400" />,
    dotColor: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    positionClass: "left-[3%] top-[14%] sm:left-[4%] sm:top-[22%] md:left-[5%] md:top-[24%]",
    animationClass: "animate-bubble-float-1",
  },
  {
    text: "Appointment scheduled",
    icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
    dotColor: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
    positionClass: "right-[3%] top-[82%] sm:right-[4%] sm:top-[76%] md:right-[5%] md:top-[30%]",
    animationClass: "animate-bubble-float-2",
  },
  {
    text: "AI replied instantly",
    icon: <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />,
    dotColor: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    positionClass: "hidden md:flex md:left-[7%] md:top-[50%] lg:left-[8%] lg:top-[52%]",
    animationClass: "animate-bubble-float-3",
  },
  {
    text: "Booking confirmed",
    icon: <CalendarCheck className="w-3.5 h-3.5 text-blue-400" />,
    dotColor: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
    positionClass: "hidden md:flex md:right-[7%] md:top-[56%] lg:right-[8%] lg:top-[54%]",
    animationClass: "animate-bubble-float-4",
  },
  {
    text: "Lead qualification complete",
    icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />,
    dotColor: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
    positionClass: "hidden lg:flex lg:left-[4%] lg:top-[76%]",
    animationClass: "animate-bubble-float-2",
  },
  {
    text: "AI assistant activated",
    icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
    dotColor: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
    positionClass: "hidden lg:flex lg:right-[4%] lg:top-[74%]",
    animationClass: "animate-bubble-float-1",
  },
];

export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-hidden">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`absolute ${bubble.positionClass} ${bubble.animationClass} flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-cyan-500/10 bg-[#0b0f19]/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-cyan-500/30`}
        >
          {/* Pulse Status Dot */}
          <span className={`w-1.5 h-1.5 rounded-full ${bubble.dotColor} animate-pulse`} />
          
          {/* Icon Wrapper */}
          <div className="flex items-center justify-center p-1 rounded-lg bg-white/5 border border-white/5">
            {bubble.icon}
          </div>
          
          {/* Notification Text */}
          <span className="text-[10px] sm:text-[11px] md:text-xs text-gray-300 font-medium tracking-wide">
            {bubble.text}
          </span>
        </div>
      ))}
    </div>
  );
}
