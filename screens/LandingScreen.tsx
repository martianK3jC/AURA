
import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden z-10">
      
      {/* Top Right Staff Login (Absolute) */}
      <button 
        onClick={() => onNavigate('operator-dashboard')}
        className="absolute top-6 right-6 md:top-8 md:right-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:bg-white/10 hover:border-violet-500/30 transition-all z-50"
      >
        <ShieldCheck size={14} />
        <span className="font-medium">AOCC Operator Login</span>
      </button>

      {/* LEFT SECTION: Value Prop & Actions */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32 pt-20 md:pt-0 z-20">
        
        {/* Mobile-only Logo Spacer */}
        <div className="md:hidden h-20"></div>

        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-wider uppercase">
              Powered by Vertex AI
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-xl leading-tight">
            Travel without <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Turbulence.</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg mb-10 font-light leading-relaxed max-w-md">
            AURA transforms Mactan-Cebu International Airport data into real-time foresight. Your personal Waze for the airport journey.
          </p>

          {/* Inputs & Actions */}
          <div className="w-full max-w-sm space-y-4">
             {/* Input Field */}
             <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <input 
                 type="text" 
                 placeholder="Enter Flight Number (e.g., PR 123)" 
                 className="glass-card w-full rounded-2xl px-6 py-4 text-white text-lg placeholder-slate-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all relative z-10"
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
        <div className="mt-16 md:mt-24 flex items-center gap-6 text-[10px] text-slate-600 font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1"><Globe size={12} /> MCIA Navigator</span>
          <span className="flex items-center gap-1"><Activity size={12} /> AOCC Predictive Layer</span>
        </div>
      </div>

      {/* RIGHT SECTION: Visuals (Desktop) / Background (Mobile) */}
      <div className="w-full md:w-1/2 absolute md:relative inset-0 md:inset-auto flex items-center justify-center pointer-events-none z-0 md:z-10">
        
        {/* Abstract 3D Visualization */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Main Glow */}
          <div className="absolute w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          
          {/* The Orb */}
          <div className="relative group">
            <div className="absolute inset-0 bg-violet-500 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
            <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-violet-600/90 to-indigo-900/90 shadow-[0_0_60px_rgba(139,92,246,0.5)] flex items-center justify-center relative z-10 border border-white/10 backdrop-blur-3xl animate-float">
              <Sparkles size={80} className="text-white/90 animate-pulse-slow drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </div>
            
            {/* Orbiting Elements (Simulating Satellites/Data) */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow scale-150"></div>
            <div className="absolute inset-0 rounded-full border border-white/5 animate-reverse-spin scale-125"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingScreen;
