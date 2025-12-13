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
      <div className="sticky top-0 z-30 p-4 pt-safe border-b border-red-100 bg-white/95 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('scenario-b')} className="text-stone-500 text-2xl hover:text-red-600 transition-colors p-2 -ml-2 rounded-full hover:bg-red-50" aria-label="Go Back">
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
          <div>
            <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">AURA Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-stone-500">Online</span>
            </div>
          </div>
          <div className="flex-1"></div>

          {/* Emergency / Support Call */}
          <button
            onClick={() => setIsCalling(true)}
            className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Emergency Help"
            aria-label="Call Support"
          >
            <PhoneCall size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Messages - Grows to fill available space */}
      <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-4">
        {messages.map((msg, index) => {
          if (msg.type === 'context') {
            return (
              <GlassCard key={msg.id} className="rounded-lg p-3 mb-4 text-xs flex justify-between items-center border border-red-200 bg-red-50/50">
                <span className="text-stone-600">{msg.text}</span>
                <span className="text-red-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  {msg.priority}
                </span>
              </GlassCard>
            );
          }
          if (msg.type === 'ai') {
            return (
              <div key={msg.id} className="max-w-[85%] mr-auto flex items-start gap-2 animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  AI
                </div>
                <div>
                  <div className="bg-white border border-stone-100 border-l-4 border-l-red-500 text-neutral-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm whitespace-pre-wrap">
                    <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    {msg.quickActions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.quickActions.map((action, i) => (
                          <button key={i} onClick={() => handleChipClick(action)} className="bg-white border-2 border-red-100 text-red-600 text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium">
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
                <div className="max-w-[85%] bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm">
                  <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }
          return null;
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 max-w-[85%] animate-slide-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
              AI
            </div>
            <div className="bg-white border border-l-4 border-l-red-500 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5 h-[54px] w-16 justify-center shadow-sm">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Sticky at bottom of flex container */}
      <div className="sticky bottom-0 z-40 p-4 pb-safe bg-white/95 backdrop-blur border-t border-neutral-200 mt-auto mb-20 md:mb-0">
        {/* Chips - Placed here or above input? Above input looks better in flow, but sticking them here ensures visibility */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide px-1">
          {[
            { label: 'Translate instructions', icon: Languages, action: 'Translate instructions' },
            { label: 'Prohibited Items?', icon: Ban, action: 'Prohibited Items?' },
            { label: 'Call my driver', icon: Phone, action: 'Call my driver' }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.action)}
              className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-br from-white to-red-50/50 border border-red-100 text-red-900 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-white hover:border-red-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm group"
            >
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <chip.icon size={14} className="text-red-600" />
              </span>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white border border-stone-200 rounded-full pl-4 pr-12 py-3 text-sm text-stone-900 focus:border-red-500 focus:outline-none placeholder:text-stone-400 shadow-sm"
            aria-label="Message Input"
          />
          <button className="absolute right-1 top-1 w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg text-sm text-white hover:scale-105 transition-transform" aria-label="Send Message">➤</button>
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