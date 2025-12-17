import React, { useState } from 'react';
import { ArrowLeft, PhoneCall, Languages, Ban, Phone } from 'lucide-react';
import { ScreenId, TravelerContext } from '../types';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  travelerContext?: TravelerContext;
}

const ChatScreen: React.FC<Props> = ({ onNavigate, travelerContext }) => {
  // Extract user info
  const userName = travelerContext?.userName || 'Traveler';
  const flightNumber = travelerContext?.flightNumber || 'your flight';

  const [messages, setMessages] = useState([
    { id: 1, type: 'context', text: `Context: ${flightNumber} Journey`, priority: 'Active' },
    { id: 2, type: 'ai', text: `Hi, ${userName}! I'm AURA, your AI travel assistant. How can I help you today?` }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  // Handle Quick Chips
  const handleChipClick = (action: string) => {
    // Add user message
    const userMsgId = Date.now();
    let userText = action;
    let aiResponse = '';

    // Contextual responses based on action
    if (action.toLowerCase().includes('translate')) {
      aiResponse = `Sure! Here's what you can tell your driver in Cebuano:\n\n"Boss, likay ta sa Fernan Bridge kay naay aksidente. Adto ta agi sa Terminal 2 entrance instead."\n\n(Translation: "Boss, let's avoid Fernan Bridge because there's an accident. Let's go through Terminal 2 entrance instead.")`;
    } else if (action.toLowerCase().includes('prohibited')) {
      aiResponse = "Here are the key prohibited items:\n\n✈️ Carry-on only:\n• Power banks (max 100Wh)\n• Laptop batteries\n• Lighters (1 per person)\n\n🚫 Completely banned:\n• Flammable liquids\n• Explosives\n• Sharp objects in carry-on\n\n💧 Liquids: Max 100ml per container, all in 1 clear bag.\n\nNeed more details on a specific item?";
    } else if (action.toLowerCase().includes('driver') || action.toLowerCase().includes('call')) {
      aiResponse = "📞 I've prepared emergency contacts for you:\n\n**Your Driver:** 0917-XXX-XXXX\n**Airport Hotline:** (032) 340-2486\n**Emergency Services:** 911\n\nWould you like me to initiate a call through your phone?";
    } else {
      aiResponse = `I'm processing that request: "${action}"...\n\nHow can I assist you with this?`;
    }

    setMessages(prev => [
      ...prev,
      { id: userMsgId, type: 'user', text: userText }
    ]);

    // Simulate AI delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: userMsgId + 1, type: 'ai', text: aiResponse }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full relative">

      {/* Sticky Header - Stays at top of flex container */}
      <div className="sticky top-0 z-30 px-6 py-4 pt-safe border-b border-stone-100 bg-white/95 backdrop-blur shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('scenario-b')} className="text-stone-500 hover:text-stone-900 transition-colors" aria-label="Go Back">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="font-bold text-red-700 text-base leading-tight">AURA Assistant</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <span className="text-[11px] font-medium text-stone-400">Online</span>
              </div>
            </div>
          </div>

          {/* Support Call */}
          <button
            onClick={() => setIsCalling(true)}
            className="text-stone-400 hover:text-stone-600 transition-colors"
            title="Call Support"
          >
            <PhoneCall size={20} />
          </button>
        </div>
      </div>

      {/* Messages - Grows to fill available space */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg, index) => {
          if (msg.type === 'context') {
            return (
              <div key={msg.id} className="w-full bg-white border border-stone-100 rounded-lg p-3 flex justify-between items-center shadow-sm mb-6">
                <span className="text-stone-400 text-xs font-medium">{msg.text}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{msg.priority}</span>
                </span>
              </div>
            );
          }
          if (msg.type === 'ai') {
            return (
              <div key={msg.id} className="max-w-[90%] mr-auto flex items-start gap-3 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-[10px] shrink-0 shadow-lg shadow-red-500/20">
                  AI
                </div>
                <div>
                  <div className="bg-white border border-stone-100 text-stone-600 px-5 py-3.5 rounded-2xl rounded-tl-none shadow-sm relative overflow-hidden">
                    {/* Left Accent Line - Refined */}
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#d32f2f]"></div>

                    {/* Formatted Text Content */}
                    <div className="text-sm leading-relaxed pl-2">
                      {msg.text.split('\n').map((line, i) => (
                        <div key={i} className={`${line.trim().startsWith('•') ? 'pl-3 my-0.5' : 'my-0.5'} min-h-[1.25em]`}>
                          {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="font-bold text-stone-800">{part.slice(2, -2)}</strong>;
                            }
                            return <span key={j}>{part}</span>;
                          })}
                        </div>
                      ))}
                    </div>

                    {msg.quickActions && (
                      <div className="mt-3 flex flex-wrap gap-2 pl-2">
                        {msg.quickActions.map((action, i) => (
                          <button key={i} onClick={() => handleChipClick(action)} className="bg-white border border-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          if (msg.type === 'user') {
            return (
              <div key={msg.id} className="flex justify-end animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="max-w-[85%] bg-gradient-to-br from-red-600 to-red-700 text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-md shadow-red-500/10">
                  <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          }
          return null;
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[90%] animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-[10px] shrink-0 shadow-lg shadow-red-500/20">
              AI
            </div>
            <div className="bg-white border border-stone-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1 shadow-sm relative h-12 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#d32f2f]"></div>
              <div className="flex gap-1 pl-2">
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Sticky at bottom of flex container */}
      <div className="sticky bottom-0 z-40 p-6 pt-2 pb-8 bg-white border-t border-stone-50 mt-auto">
        {/* Chips */}
        <div className="flex gap-3 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { label: 'Translate instructions', icon: Languages, action: 'Translate instructions' },
            { label: 'Prohibited Items?', icon: Ban, action: 'Prohibited Items?' },
            { label: 'Call my driver', icon: Phone, action: 'Call my driver' }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.action)}
              className="flex items-center gap-2 whitespace-nowrap bg-red-50 border border-red-100 text-[#881337] text-[11px] font-bold px-4 py-2.5 rounded-xl hover:bg-red-100 transition-all duration-200 active:scale-95"
            >
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                <chip.icon size={10} className="text-red-600" />
              </div>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white border-2 border-red-50 rounded-full pl-6 pr-14 py-3.5 text-sm text-stone-700 placeholder:text-stone-300 focus:border-red-200 focus:outline-none focus:ring-4 focus:ring-red-50/50 transition-all font-medium shadow-sm"
            aria-label="Message Input"
          />
          <button className="absolute right-2 top-2 w-10 h-10 bg-[#d32f2f] rounded-full flex items-center justify-center shadow-md shadow-red-500/20 text-white hover:bg-red-700 hover:scale-105 active:scale-95 transition-all" aria-label="Send Message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </div>

      {/* CALL OVERLAY */}
      {isCalling && (
        <div className="fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-xl flex flex-col items-center justify-between py-12 animate-in fade-in duration-300">

          {/* Header Info */}
          <div className="flex flex-col items-center mt-10">
            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-4xl">👮</span>
              <div className="absolute inset-0 border-2 border-red-500/50 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border-2 border-red-500/30 rounded-full animate-ping [animation-delay:0.5s]"></div>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Airport Emergency</h2>
            <p className="text-red-400 font-medium animate-pulse">Connecting...</p>
          </div>

          {/* Call Actions Grid */}
          <div className="grid grid-cols-3 gap-8 w-full max-w-xs px-4">
            <div className="flex flex-col items-center gap-2 text-neutral-400 opacity-50">
              <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center"><span className="text-xl">🎙️</span></div>
              <span className="text-xs">Mute</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-neutral-400 opacity-50">
              <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center"><span className="text-xl">⌨️</span></div>
              <span className="text-xs">Keypad</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-neutral-400 opacity-50">
              <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center"><span className="text-xl">🔊</span></div>
              <span className="text-xs">Speaker</span>
            </div>
          </div>

          {/* End Call Button */}
          <button
            onClick={() => setIsCalling(false)}
            className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all transform hover:scale-110 active:scale-95 mb-8"
          >
            <PhoneCall size={32} className="rotate-[135deg]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;