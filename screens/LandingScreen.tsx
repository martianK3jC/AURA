
import React from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  const [flightNum, setFlightNum] = React.useState('');
  const [error, setError] = React.useState('');

  const handleStart = () => {
    if (flightNum.toUpperCase() === 'XYZ999') {
      setError('Flight not found. Please check your details.');
      return;
    }
    setError('');
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-x-hidden z-10 font-sans selection:bg-violet-500/30">

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Mobile: Removed Top Glow to reduce noise as requested */}

        {/* Desktop: Right Side Glow */}
        <div className="hidden md:block absolute top-[-10%] right-[-10%] w-[50vw] h-[100vh] bg-violet-900/30 rounded-full blur-[150px]"></div>
      </div>

      {/* LEFT SECTION: MAIN CONTENT WRAPPER */}
      {/* Changed py-12 to py-4/py-8 for better vertical fit on laptops */}
      <div className="w-full md:w-[55%] flex flex-col justify-between px-6 md:px-16 lg:px-20 py-4 md:py-8 xl:py-12 z-20 relative min-h-screen md:h-screen md:min-h-0">

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
            title="AOCC Operator Access - Login to Airport Operation Control Center"
            aria-label="Operator Dashboard Login"
          >
            <ShieldCheck size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Operator</span>
          </button>
        </div>

        {/* MIDDLE: HERO CONTENT (Centered Vertically) */}
        {/* Added h-full and justifying to ensure it takes available space but doesn't overflow */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left py-2">

          <div className="animate-slide-up space-y-3 md:space-y-5 lg:space-y-6 max-w-lg md:max-w-none flex flex-col items-center md:items-start">

            {/* Mobile Hero Visual (The Logo/Orb) - As requested */}
            <div className="md:hidden relative w-32 h-32 mb-2 animate-float-subtle">
              {/* Orbiting rings - outer container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[200px] h-[200px] border border-white/5 rounded-full animate-spin-slower"></div>
                <div className="absolute w-[164px] h-[164px] border border-white/5 rounded-full animate-reverse-spin"></div>
              </div>

              {/* Main orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-violet-900/50 flex items-center justify-center animate-float-slow">
                <div className="absolute inset-0 bg-violet-400/10 rounded-full animate-pulse-slow"></div>
                <Sparkles size={48} className="text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] relative z-10" />
              </div>
            </div>

            {/* Badge - HIDDEN ON MOBILE */}
            <div title="AURA uses Gemini Vertex AI to predict traffic and crowd levels." className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md w-fit mx-auto md:mx-0 cursor-help transition-colors hover:bg-violet-500/20">
              <Sparkles size={12} className="text-violet-400" />
              <span className="text-violet-200 text-[10px] font-bold tracking-widest uppercase">
                Powered by Vertex AI
              </span>
            </div>

            {/* Hero Headline - Reduced size for better desktop fit */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl text-center md:text-left">
              Travel without <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">Turbulence.</span>
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xs md:max-w-lg text-center md:text-left">
              Predictive AI that sees bottlenecks before they happen. Your journey, optimized.
            </p>

            {/* Action Area */}
            <div className="w-full max-w-sm mx-auto md:mx-0 pt-2 md:pt-4 space-y-3 md:space-y-4">
              {/* Input Field */}
              <div className="relative group">
                <div className="absolute inset-0 bg-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`relative bg-white/5 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-2xl p-1 flex items-center backdrop-blur-xl focus-within:bg-white/10 focus-within:border-violet-500/50 transition-all`}>
                  <div className="pl-4 text-slate-400">✈️</div>
                  <input
                    type="text"
                    value={flightNum}
                    onChange={(e) => {
                      setFlightNum(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="e.g., PR 123 or 5J 567"
                    className="w-full bg-transparent border-none text-white px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-0 text-base md:text-lg text-center md:text-left"
                    aria-label="Enter Flight Number"
                  />
                </div>
                {error && <p className="text-red-400 text-xs ml-2 mt-1 font-medium">{error}</p>}
              </div>

              {/* Primary Button */}
              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 md:py-3.5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20"
                aria-label="Start Journey"
              >
                <span className="text-base md:text-lg">Start Journey</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} aria-hidden="true" />
              </button>

              {/* Guest Link */}
              <button
                onClick={() => onNavigate('scenario-b')}
                className="text-slate-500 text-xs md:text-sm hover:text-white transition-colors py-2 font-medium"
                aria-label="Continue as Guest"
              >
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
            {/* Outer container for rings - desktop */}
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] animate-float-subtle">
              {/* Orbiting particles - centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[460px] h-[460px] lg:w-[580px] lg:h-[580px] border border-white/5 rounded-full animate-spin-slower"></div>
                <div className="absolute w-[380px] h-[380px] lg:w-[490px] lg:h-[490px] border border-white/5 rounded-full animate-reverse-spin"></div>
              </div>

              {/* Main orb */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-violet-900/50 flex items-center justify-center animate-float-slow">
                <div className="absolute inset-0 bg-violet-400/10 rounded-full animate-pulse-slow"></div>
                <Sparkles size={120} className="text-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] relative z-10" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingScreen;
