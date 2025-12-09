import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenId } from '../types';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const ChatScreen: React.FC<Props> = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'context', text: 'Context: Scenario B (Traffic Delay)', priority: 'High Priority' },
    { id: 2, type: 'ai', text: "Hi! I'm AURA. I noticed a significant delay on your route to the airport due to an accident on Fernan Bridge. How can I help?" }
  ]);
  const [inputText, setInputText] = useState('');

  // Handle Quick Chips
  const handleChipClick = (action: string) => {
    // Add user message
    const userMsgId = Date.now();
    let userText = '';
    let aiResponse = '';

    if (action === 'translate') {
      userText = 'Can you translate instructions for my driver to Cebuano?';
      aiResponse = `"Boss, likay ta sa Fernan Bridge kay naay aksidente. Adto ta agi sa Terminal 2 entrance."`;
    } else if (action === 'prohibited') {
      userText = 'What items are prohibited?';
      aiResponse = "Power banks are allowed in carry-on bags only (max 100Wh). Liquids must be under 100ml. Do not pack these in checked luggage.";
    } else {
      userText = action;
      aiResponse = "I'm processing that request for you...";
    }

    setMessages(prev => [
      ...prev,
      { id: userMsgId, type: 'user', text: userText }
    ]);

    // Simulate AI delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: userMsgId + 1, type: 'ai', text: aiResponse }
      ]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Sticky Header - Stays at top of flex container */}
      <div className="sticky top-0 z-30 p-4 border-b border-white/10 bg-slate-950/95 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('scenario-b')} className="text-slate-400 text-2xl hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5">
             <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">AURA Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages - Grows to fill available space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          if (msg.type === 'context') {
            return (
              <div key={msg.id} className="bg-slate-900 border border-white/10 rounded-lg p-3 mb-4 text-xs text-slate-400 flex justify-between items-center">
                <span>{msg.text}</span>
                <span className="text-orange-400 font-bold">⚠ {msg.priority}</span>
              </div>
            );
          }
          if (msg.type === 'ai') {
            return (
              <div key={msg.id} className="flex gap-3 max-w-[85%] animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center border border-violet-500/30 shrink-0 text-white">✨</div>
                <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border border-violet-500/30 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-white text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            );
          }
          if (msg.type === 'user') {
            return (
              <div key={msg.id} className="flex gap-3 max-w-[85%] ml-auto justify-end animate-slide-up">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tr-sm p-4 text-right">
                  <p className="text-white text-sm">{msg.text}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Input Area - Sticky at bottom of flex container */}
      <div className="sticky bottom-0 z-30 p-4 bg-slate-950/90 backdrop-blur border-t border-white/10 mt-auto">
        {/* Chips - Placed here or above input? Above input looks better in flow, but sticking them here ensures visibility */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
           <button 
             onClick={() => handleChipClick('translate')}
             className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors"
           >
             Translate instructions
           </button>
           <button 
             onClick={() => handleChipClick('prohibited')}
             className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors"
           >
             Prohibited Items?
           </button>
           <button 
             onClick={() => handleChipClick('Call my driver')}
             className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors"
           >
             Call my driver
           </button>
        </div>

        <div className="relative">
           <input 
             type="text" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="Type a message..." 
             className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:border-violet-500 focus:outline-none placeholder:text-slate-500" 
           />
           <button className="absolute right-1 top-1 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg text-sm text-white hover:scale-105 transition-transform">➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;