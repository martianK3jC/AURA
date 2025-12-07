import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenId } from '../types';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const ChatScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col pb-44">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-slate-950/90 backdrop-blur z-20 sticky top-0 pt-safe">
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

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Context Card */}
        <div className="bg-slate-900 border border-white/10 rounded-lg p-3 mb-4 text-xs text-slate-400 flex justify-between items-center">
           <span>Context: Scenario B (Traffic Delay)</span>
           <span className="text-orange-400 font-bold">⚠ High Priority</span>
        </div>

        {/* AI Msg */}
        <div className="flex gap-3 max-w-[85%]">
           <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center border border-violet-500/30 shrink-0 text-white">✨</div>
           <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border border-violet-500/30 rounded-2xl rounded-tl-sm p-4">
              <p className="text-white text-sm leading-relaxed">Hi! I'm AURA. I noticed a significant delay on your route to the airport due to an accident on Fernan Bridge. How can I help?</p>
           </div>
        </div>

        {/* Chips */}
        <div className="flex gap-2 pl-11 overflow-x-auto pb-2 scrollbar-hide">
           <button className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors">Reroute me</button>
           <button className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors">Call my driver</button>
           <button className="whitespace-nowrap bg-white/5 border border-violet-500/30 text-violet-300 text-xs px-3 py-2 rounded-full hover:bg-violet-500/20 transition-colors">Translate instructions</button>
        </div>

        {/* User Msg */}
        <div className="flex gap-3 max-w-[85%] ml-auto justify-end">
           <div className="bg-white/10 backdrop-blur-xl rounded-2xl rounded-tr-sm p-4 text-right">
              <p className="text-white text-sm">Can you translate instructions for my driver to Cebuano?</p>
           </div>
        </div>

        {/* AI Msg 2 */}
        <div className="flex gap-3 max-w-[85%]">
           <div className="w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center border border-violet-500/30 shrink-0 text-white">✨</div>
           <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border border-violet-500/30 rounded-2xl rounded-tl-sm p-4 space-y-3">
              <p className="text-white text-sm">Of course! Here is the message:</p>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300 italic text-sm">
                 "Boss, likay ta sa Fernan Bridge kay naay aksidente. Adto ta agi sa Terminal 2 entrance."
              </div>
              <div className="flex gap-2 pt-1">
                 <button className="flex-1 bg-violet-600 text-white text-xs py-2 rounded-lg font-medium hover:bg-violet-500 transition-colors">Send SMS</button>
                 <button className="flex-1 bg-white/10 text-white text-xs py-2 rounded-lg hover:bg-white/20 transition-colors">Copy</button>
              </div>
           </div>
        </div>
      </div>

      {/* Input Area - Fixed Sticky Footer */}
      {/* FIXED: Changed bottom-16 to bottom-20 so it doesn't get covered by the 80px Nav Bar */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 bg-slate-950/90 backdrop-blur border-t border-white/10 z-30">
        <div className="relative">
           <input type="text" placeholder="Type a message..." className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:border-violet-500 focus:outline-none placeholder:text-slate-500" />
           <button className="absolute right-1 top-1 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg text-sm text-white hover:scale-105 transition-transform">➤</button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;