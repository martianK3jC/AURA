import React from 'react';
import { ScreenId } from '../types';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden z-10">
      {/* Content */}
      <div className="z-10 flex flex-col items-center w-full">
        {/* Glowing Orb */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_60px_rgba(139,92,246,0.6)] animate-pulse mb-8"></div>

        <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">AURA</h1>
        <p className="text-slate-400 text-sm tracking-[0.2em] uppercase mb-12">AI-Powered Travel Assistant</p>

        <div className="w-full space-y-4">
           <input 
             type="text" 
             placeholder="Enter Flight Number (e.g., PR 123)" 
             className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 text-white text-center text-lg placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
           />
           
           <button 
             onClick={() => onNavigate('scenario-b')}
             className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] active:scale-95 transition-all"
           >
             Start Journey
           </button>
           
           <button className="w-full text-slate-500 text-sm hover:text-white transition-colors">
             Continue as Guest
           </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;