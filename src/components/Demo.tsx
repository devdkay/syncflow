import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Phone, Play, Pause, Bot, User, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');

  // --- CHATBOT DEMO STATE ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm SyncFlow's AI Assistant, configured for a local wellness clinic. How can I help you today?",
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChips, setActiveChips] = useState<string[]>([
    '📅 Book an appointment',
    '🕒 What are your hours?',
    '📍 Where are you located?'
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom (only after user interaction, not on initial load)
  useEffect(() => {
    if (chatMessages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const handleChipClick = (chipText: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      sender: 'user',
      text: chipText.substring(2), // remove emoji
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Remove the clicked chip to keep flow natural
    setActiveChips([]);

    // Simulate AI response delay
    setTimeout(() => {
      let botText = "";
      let newChips: string[] = [];

      if (chipText.includes('Book')) {
        botText = "I'd be happy to help you book a slot! Dr. Jenkins has openings this Wednesday at 10:00 AM and 2:30 PM. Would you like to secure one of these appointments?";
        newChips = ['✨ Yes, Wednesday at 10:00 AM', '✨ Show more times', '💬 Speak to receptionist'];
      } else if (chipText.includes('hours')) {
        botText = "We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays.";
        newChips = ['📅 Book an appointment', '📍 Where are you located?'];
      } else if (chipText.includes('located')) {
        botText = "Our clinic is located at 1545 Barrington Street in the heart of downtown Halifax, Nova Scotia. We have dedicated client parking at the back!";
        newChips = ['📅 Book an appointment', '🕒 What are your hours?'];
      } else if (chipText.includes('10:00 AM')) {
        botText = "Excellent selection! I've reserved Wednesday at 10:00 AM for you. Could you please provide your full name and email to finalize the booking?";
        newChips = ['👤 Submit Details', '❌ Cancel booking'];
      } else if (chipText.includes('receptionist') || chipText.includes('Submit Details')) {
        botText = "Perfect. I've synced this booking to our system. A confirmation email and calendar invite have been sent to you! I've also notified our front desk. See you soon!";
        newChips = ['🔄 Restart Demo', '💬 Ask another question'];
      } else {
        botText = "I can definitely assist you with that. SyncFlow specializes in automating custom solutions. Would you like us to custom build a similar chatbot for your business?";
        newChips = ['📱 Contact Syncflow', '🔄 Restart Demo'];
      }

      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setActiveChips(newChips);
    }, 1200);
  };

  const resetChat = () => {
    setChatMessages([
      {
        sender: 'bot',
        text: "Hi there! 👋 I'm SyncFlow's AI Assistant, configured for a local wellness clinic. How can I help you today?",
        timestamp: 'Just now'
      }
    ]);
    setIsTyping(false);
    setActiveChips([
      '📅 Book an appointment',
      '🕒 What are your hours?',
      '📍 Where are you located?'
    ]);
  };

  // --- VOICE AGENT DEMO STATE ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const transcript = [
    { speaker: 'system', text: '🔔 Calling Metro Plumbing & Heating (Dartmouth, NS)...' },
    { speaker: 'agent', text: 'Thanks for calling Metro Plumbing & Heating. I\'m your AI receptionist. How can I help you today?' },
    { speaker: 'user', text: 'Hey there. I\'ve got a clogged drain in my kitchen and need a plumber out here as soon as possible.' },
    { speaker: 'agent', text: 'Oh no, kitchen clogs are a major headache! I can absolutely get a technician scheduled. We have an opening today at 3:00 PM or tomorrow morning at 9:00 AM. Which of those works best for you?' },
    { speaker: 'user', text: 'Today at 3:00 PM works great.' },
    { speaker: 'agent', text: 'Perfect, I\'ve reserved today at 3:00 PM for you. Could you please give me your name and the service address in Dartmouth?' },
    { speaker: 'user', text: 'My name is John Doe, and the address is 123 Maple Street in Dartmouth.' },
    { speaker: 'agent', text: 'Got it, John. I\'ve booked our plumbing technician for today at 3:00 PM at 123 Maple Street. A confirmation SMS text with your booking details is heading to your phone right now. Is there anything else I can handle for you?' },
    { speaker: 'user', text: 'No, that\'s all. Thanks a lot, this was incredibly easy!' },
    { speaker: 'agent', text: 'It\'s my pleasure! Have a wonderful day, John, and we\'ll see you at 3:00 PM.' },
    { speaker: 'system', text: '📞 Call ended. Time saved: 6 minutes. Appointment automatically synced to CRM & Calendar.' }
  ];

  useEffect(() => {
    if (isPlaying) {
      if (currentLineIndex < transcript.length - 1) {
        const nextIndex = currentLineIndex + 1;
        // Adjust delays based on speaker type for natural flow
        const delay = transcript[nextIndex].speaker === 'system' ? 1500 : 3000;
        
        voiceTimeoutRef.current = setTimeout(() => {
          setCurrentLineIndex(nextIndex);
        }, delay);
      } else {
        setIsPlaying(false);
      }
    } else {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
    }

    return () => {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
    };
  }, [isPlaying, currentLineIndex]);

  const handleVoicePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentLineIndex === transcript.length - 1) {
        // Reset to beginning
        setCurrentLineIndex(-1);
      }
      setIsPlaying(true);
    }
  };

  const handleVoiceReset = () => {
    setIsPlaying(false);
    setCurrentLineIndex(-1);
  };

  return (
    <section id="demo" className="py-24 px-6 bg-gradient-to-b from-[#0d0d0d] via-black to-[#0d0d0d] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00D4FF]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block text-[#FF6B35] text-sm font-semibold tracking-wider uppercase mb-3">
            See the Product in Action
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive AI <span className="text-[#00D4FF]">Demos</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Experience our AI chatbot and voice receptionists first-hand. See how we hook up automated scheduling and lead capture in real-time.
          </p>
        </div>

        {/* Console Tab Selectors */}
        <div className="flex justify-center mb-8 sm:mb-10 px-4">
          <div className="flex w-full max-w-md sm:max-w-none bg-gray-900/60 p-1 sm:p-1.5 rounded-full border border-gray-800 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#00a8cc] text-black shadow-md shadow-[#00D4FF]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">🤖 24/7 Chatbot Demo</span>
              <span className="sm:hidden">🤖 Chatbot</span>
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'voice'
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#00a8cc] text-black shadow-md shadow-[#00D4FF]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">📞 Voice Agent Simulator</span>
              <span className="sm:hidden">📞 Voice Agent</span>
            </button>
          </div>
        </div>

        {/* Demo Box Container */}
        <div className="bg-gray-950/80 border border-gray-850 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
          
          {/* LEFT: Context info */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-900 p-6 flex flex-col justify-between bg-gray-950">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#00D4FF]">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">SyncFlow AI Lab</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {activeTab === 'chat' ? 'Intelligent Web Agent' : 'Conversational Voice Agent'}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {activeTab === 'chat'
                  ? 'Mocked for Halifax Wellness Clinic. Resolves patient queries, qualifies local leads, and syncs directly into booking calendars in real-time.'
                  : 'Mocked for Metro Plumbing & Heating (Dartmouth). Handles incoming calls, queries CRM databases for openings, takes address details, and schedules dispatch.'}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-xs text-[#00D4FF] font-bold mt-0.5">✓</div>
                  <p className="text-xs text-gray-300"><strong>Natural Language:</strong> Responds naturally, matching local Halifax / NS context.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-xs text-[#00D4FF] font-bold mt-0.5">✓</div>
                  <p className="text-xs text-gray-300"><strong>CRM Integration:</strong> Feeds lead inputs instantly into your sales pipeline or email inbox.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-xs text-[#00D4FF] font-bold mt-0.5">✓</div>
                  <p className="text-xs text-gray-300"><strong>Automatic Booking:</strong> Locks calendar times, preventing double bookings.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-900">
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#e05822] text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#FF6B35]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Build This For My Business
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Live Interactive Area */}
          <div className="w-full md:w-2/3 flex flex-col h-[550px] md:h-full bg-[#08080c] relative">
            
            {/* T1: CHATBOT CONTAINER */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full justify-between">
                
                {/* Chat Top bar */}
                <div className="px-6 py-4 bg-gray-950 border-b border-gray-900 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center border border-[#00D4FF]/30">
                      <Bot className="w-4 h-4 text-[#00D4FF]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Halifax Clinic AI Assistant</h4>
                      <p className="text-[11px] text-[#00D4FF] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Active & Serving
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetChat}
                    className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-800 hover:bg-gray-900 transition-all"
                  >
                    Reset Chat
                  </button>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                        msg.sender === 'user'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-[#00D4FF]/10 border-[#00D4FF]/20'
                      }`}>
                        {msg.sender === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-[#00D4FF]" />}
                      </div>
                      <div>
                        <div className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#FF6B35] to-[#e05822] text-white rounded-tr-none'
                            : 'bg-gray-900/60 border border-gray-800 text-gray-250 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-500 block mt-1 px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 max-w-[80%] mr-auto">
                      <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                      <div className="bg-gray-900/60 border border-gray-800 p-3.5 sm:p-4 rounded-2xl rounded-tl-none">
                        <div className="flex gap-1.5 items-center justify-center h-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Interactive Suggestion Chips */}
                <div className="p-3 sm:p-4 bg-gray-950 border-t border-gray-900">
                  {activeChips.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 px-1">Select a reply to test flow:</p>
                      <div className="flex flex-wrap gap-2">
                        {activeChips.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleChipClick(chip)}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 border border-gray-800 text-gray-300 text-[11px] sm:text-xs rounded-full hover:border-[#00D4FF] hover:bg-gray-900/80 transition-all font-semibold active:scale-95"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    !isTyping && (
                      <div className="flex justify-center py-2">
                        <button
                          onClick={resetChat}
                          className="px-4 py-2 bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 text-xs rounded-full hover:bg-[#00D4FF]/20 transition-all font-bold"
                        >
                          🔄 Reset Demo Flow
                        </button>
                      </div>
                    )
                  )}
                </div>

              </div>
            )}

            {/* T2: VOICE AGENT SIMULATOR */}
            {activeTab === 'voice' && (
              <div className="flex flex-col h-full justify-between">
                
                {/* Audio Wave & Status */}
                <div className="p-5 sm:p-8 bg-gray-950 border-b border-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05),transparent_50%)] pointer-events-none"></div>
                  
                  {/* Outer Pulsing Wave ring */}
                  <div className="relative mb-4 sm:mb-6">
                    <div className={`absolute inset-0 rounded-full bg-[#00D4FF]/10 transition-all duration-300 ${isPlaying ? 'scale-150 opacity-100 animate-ping' : 'scale-100 opacity-0'}`}></div>
                    
                    <button
                      onClick={handleVoicePlayPause}
                      className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                        isPlaying
                          ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/20 hover:scale-105'
                          : 'bg-gradient-to-r from-[#00D4FF] to-[#00a8cc] shadow-lg shadow-[#00D4FF]/30 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 sm:w-8 h-6 sm:h-8 text-white fill-current" />
                      ) : (
                        <Play className="w-6 sm:w-8 h-6 sm:h-8 text-black fill-current ml-0.5 sm:ml-1" />
                      )}
                    </button>
                  </div>

                  <div className="text-center z-10">
                    <div className="text-sm font-bold text-white mb-1">
                      {isPlaying ? 'Call in Progress...' : currentLineIndex === transcript.length - 1 ? 'Call Finished' : 'Click Play to Start Call'}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 justify-center">
                      <Volume2 className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span>Plumbing Assistant Configured</span>
                    </div>
                  </div>

                  {/* Simulated wave animation below player */}
                  {isPlaying && (
                    <div className="flex gap-1 items-center justify-center mt-4 sm:mt-6 h-6 sm:h-8">
                      {[...Array(12)].map((_, idx) => {
                        const randomHeight = [12, 28, 16, 32, 20, 12, 24, 18, 30, 14, 24, 10][idx];
                        const duration = [0.8, 1.2, 0.9, 1.4, 1.1, 0.7, 1.3, 1.0, 1.5, 0.8, 1.2, 0.9][idx];
                        return (
                          <div
                            key={idx}
                            className="w-[3px] sm:w-1 bg-[#00D4FF] rounded-full transition-all"
                            style={{
                              height: `${randomHeight}px`,
                              animation: `voiceWave ${duration}s ease-in-out infinite alternate`
                            }}
                          ></div>
                        );
                      })}
                      <style>{`
                        @keyframes voiceWave {
                          0% { transform: scaleY(0.4); opacity: 0.5; }
                          100% { transform: scaleY(1.2); opacity: 1; }
                        }
                      `}</style>
                    </div>
                  )}
                </div>

                {/* Transcript feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0 bg-gray-950/40">
                  {currentLineIndex === -1 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                      <Phone className="w-12 h-12 text-gray-700 mb-4 animate-bounce" />
                      <p className="text-sm font-medium mb-1">Interactive Call Simulator</p>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Watch how our AI voice agents converse naturally with local callers, gathering diagnostic details and booking slots.
                      </p>
                    </div>
                  ) : (
                    transcript.slice(0, currentLineIndex + 1).map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 text-sm animate-fade-in ${
                          line.speaker === 'system'
                            ? 'justify-center'
                            : line.speaker === 'user'
                            ? 'flex-row-reverse text-right'
                            : ''
                        }`}
                      >
                        {line.speaker !== 'system' && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                            line.speaker === 'user' ? 'bg-gray-800 border-gray-700' : 'bg-[#00D4FF]/10 border-[#00D4FF]/20'
                          }`}>
                            {line.speaker === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-[#00D4FF]" />}
                          </div>
                        )}
                        
                        {line.speaker === 'system' ? (
                          <div className="bg-gray-900/60 border border-gray-850 px-4 py-2.5 rounded-full text-xs font-semibold text-[#00D4FF] text-center">
                            {line.text}
                          </div>
                        ) : (
                          <div className="max-w-[75%]">
                            <div className={`p-3.5 sm:p-4 rounded-xl leading-relaxed text-left ${
                              line.speaker === 'user'
                                ? 'bg-gradient-to-r from-[#FF6B35] to-[#e05822] text-white rounded-tr-none'
                                : 'bg-gray-900/80 border border-gray-800 text-gray-200 rounded-tl-none'
                            }`}>
                              <span className="font-bold text-xs block mb-1 text-gray-400">
                                {line.speaker === 'user' ? 'Customer' : 'SyncFlow AI Voice'}
                              </span>
                              {line.text}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Reset button at bottom */}
                <div className="p-4 bg-gray-950 border-t border-gray-900 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Audio playback simulated.</span>
                  {(currentLineIndex > -1 || isPlaying) && (
                    <button
                      onClick={handleVoiceReset}
                      className="text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-850 hover:bg-gray-900"
                    >
                      Reset Simulator
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
