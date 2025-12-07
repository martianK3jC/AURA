import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, Plane, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden z-10 pb-20">
      {/* Content */}
      <div className="z-10 flex flex-col items-center w-full max-w-sm animate-slide-up">
        
        {/* Logo / Orb */}
        <div className="relative mb-12 group cursor-pointer">
          <div className="absolute inset-0 bg-violet-600 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.4)] flex items-center justify-center relative z-10 border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <Sparkles size={48} className="text-white animate-pulse-slow" />
          </div>
        </div>

        {/* Typography */}
        <h1 className="text-6xl font-bold text-white mb-3 tracking-tight text-center drop-shadow-xl">AURA</h1>
        <p className="text-slate-400 text-sm tracking-[0.3em] uppercase mb-12 text-center font-medium">AI-Powered Unified Resource & Assistance</p>

        {/* Inputs & Actions */}
        <div className="w-full space-y-4">
           {/* Input Field */}
           <div className="relative group">
             <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             <input 
               type="text" 
               placeholder="Enter Flight Number (e.g., PR 123)" 
               className="glass-card w-full rounded-2xl px-6 py-4 text-white text-center text-lg placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all relative z-10"
             />
           </div>
           
           {/* Primary Button */}
           <button 
             onClick={() => onNavigate('scenario-b')}
             className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-4 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
             <span className="relative z-10">Start Journey</span>
             <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" size={20} />
           </button>
           
           {/* Secondary Action */}
           <button 
             onClick={() => onNavigate('scenario-b')} 
             className="w-full py-2 text-slate-500 text-sm hover:text-white transition-colors flex items-center justify-center gap-2"
           >
             Continue as Guest
           </button>
        </div>
      </div>
      
      {/* Footer / Copyright */}
      <div className="absolute bottom-8 text-[10px] text-slate-600 tracking-wider font-medium">
        POWERED BY GEMINI AI
      </div>
    </div>
  );
};

export default LandingScreen;