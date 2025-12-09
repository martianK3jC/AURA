
import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-hidden z-10 font-sans selection:bg-violet-500/30">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Mobile: Removed Top Glow to reduce noise as requested */}

        {/* Desktop: Right Side Glow */}
        <div className="hidden md:block absolute top-[-10%] right-[-10%] w-[50vw] h-[100vh] bg-violet-900/30 rounded-full blur-[150px]"></div>
      </div>

      {/* LEFT SECTION: MAIN CONTENT WRAPPER */}
      <div className="w-full md:w-[55%] flex flex-col justify-between px-6 md:px-20 lg:px-24 py-6 md:py-12 z-20 relative h-screen">

        {/* TOP: HEADER (Logo) - Flex Block */}
        <div className="flex justify-between items-center w-full grow-0 shrink-0 h-14">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30 flex items-center justify-center">
              <Sparkles className="text-white fill-white/20" size={20} />
            </div>
            {/* Hide Text Logo on Mobile to reduce clutter */}
            <span className="hidden md:block text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">AURA</span>
          </div>

          {/* Operator Login - Visible on all screens */}
          <button
            onClick={() => onNavigate('operator-dashboard')}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-violet-500/30 transition-all backdrop-blur-md"
          >
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Operator</span>
          </button>
        </div>

        {/* MIDDLE: HERO CONTENT (Centered Vertically) */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left py-4 md:py-10">

          <div className="animate-slide-up space-y-4 md:space-y-8 max-w-lg md:max-w-none flex flex-col items-center md:items-start">

            {/* Mobile Hero Visual (The Logo/Orb) - As requested */}
            <div className="md:hidden w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-violet-900/50 flex items-center justify-center animate-float-slow mb-2 relative">
              <div className="absolute inset-0 bg-violet-400/10 rounded-full animate-pulse-slow"></div>
              <Sparkles size={48} className="text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />

              {/* Orbiting particles (Scaled down) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-spin-slower"></div>
            </div>

            {/* Badge - HIDDEN ON MOBILE */}
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md w-fit mx-auto md:mx-0">
              <Sparkles size={12} className="text-violet-400" />
              <span className="text-violet-200 text-[10px] font-bold tracking-widest uppercase">
                Powered by Vertex AI
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl text-center md:text-left">
              Travel without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">Turbulence.</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-xs md:max-w-lg text-center md:text-left">
              Your personal airport traffic controller. Real-time foresight for a seamless journey.
            </p>

            {/* Action Area */}
            <div className="w-full max-w-sm mx-auto md:mx-0 pt-2 md:pt-4 space-y-3 md:space-y-4">
              {/* Input Field */}
              <div className="relative group">
                <div className="absolute inset-0 bg-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-1 flex items-center backdrop-blur-xl focus-within:bg-white/10 focus-within:border-violet-500/50 transition-all">
                  <div className="pl-4 text-slate-400">✈️</div>
                  <input
                    type="text"
                    placeholder="Flight Number"
                    className="w-full bg-transparent border-none text-white px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-0 text-base md:text-lg text-center md:text-left"
                  />
                </div>
              </div>

              {/* Primary Button */}
              <button
                onClick={() => onNavigate('scenario-b')}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 md:py-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20"
              >
                <span className="text-base md:text-lg">Start Journey</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>

              {/* Guest Link */}
              <button onClick={() => onNavigate('scenario-b')} className="text-slate-500 text-xs md:text-sm hover:text-white transition-colors py-2 font-medium">
                Continue as Guest
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM: FOOTER - HIDDEN ON MOBILE TO PREVENT CLUTTER */}
        <div className="hidden md:flex w-full flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 text-[10px] text-slate-600 font-medium uppercase tracking-wider shrink-0">
          <span className="flex items-center gap-1"><Globe size={12} /> MCIA Navigator (v2.0.4)</span>
          <span className="hidden md:inline w-1 h-1 bg-slate-700 rounded-full"></span>
          <span className="flex items-center gap-1"><Activity size={12} /> AOCC Predictive Layer</span>
        </div>

      </div>

      {/* RIGHT SECTION: Visuals (Desktop Only) */}
      <div className="hidden md:flex w-[45%] h-full relative items-center justify-center z-10">
        <div className="relative w-full h-full flex items-center justify-start pointer-events-none">

          {/* The Orb - Positioned appropriately for desktop */}
          <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>

          <div className="relative z-10 ml-[-50px] group">
            <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-violet-900/50 flex items-center justify-center animate-float-slow">
              <div className="absolute inset-0 bg-violet-400/10 rounded-full animate-pulse-slow"></div>
              <Sparkles size={120} className="text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
            </div>

            {/* Orbiting particles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-spin-slower"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-reverse-spin"></div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingScreen;
