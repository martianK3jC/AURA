import React, { useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Activity, Plane, Clock, MapPin } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

import DisasterAlertModal from '../components/DisasterAlertModal';
import auraLogo from '../img/aura_logo.png';

const LandingScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showDisasterDemo, setShowDisasterDemo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    onNavigate('traveler-login');
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col xl:flex-row relative overflow-x-hidden overflow-y-auto font-sans selection:bg-red-500/30 bg-neutral-50">

      {/* DISASTER ALERT DEMO COMPONENT */}
      <DisasterAlertModal isOpen={showDisasterDemo} onClose={() => setShowDisasterDemo(false)} type="typhoon" />

      {/* BACKGROUND ELEMENTS - LINE ART FLOWERS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Left Side Flower */}
        <svg className="absolute -left-20 -bottom-20 w-[600px] h-[600px] opacity-[0.07] animate-spin-slower" viewBox="0 0 400 400" fill="none" stroke="currentColor">
          <g transform="translate(200, 200)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse key={i} cx="0" cy="-80" rx="25" ry="100" transform={`rotate(${angle})`} className="stroke-red-900" strokeWidth="2" />
            ))}
            <circle cx="0" cy="0" r="20" className="stroke-red-900" strokeWidth="4" />
          </g>
        </svg>

        {/* Right Side Flower - Hidden on Mobile */}
        <svg className="hidden md:block absolute -right-20 -top-20 w-[700px] h-[700px] opacity-[0.05] animate-reverse-spin" viewBox="0 0 400 400" fill="none" stroke="currentColor">
          <g transform="translate(200, 200)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse key={i} cx="0" cy="-80" rx="25" ry="100" transform={`rotate(${angle})`} className="stroke-stone-900" strokeWidth="2" />
            ))}
            <circle cx="0" cy="0" r="20" className="stroke-stone-900" strokeWidth="4" />
          </g>
        </svg>
      </div>

      {/* LEFT SECTION: CONTENT */}
      <div className="w-full xl:w-[45%] flex flex-col px-6 py-6 md:px-12 md:py-8 lg:px-20 z-20 relative min-h-[100dvh] xl:h-auto">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={auraLogo} alt="AURA Logo" className="w-10 h-10 rounded-2xl object-contain shadow-lg shadow-red-500/20" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">AURA</h1>
              <p className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Your Airport Concierge</p>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div className={`flex flex-col justify-center items-center text-center xl:items-start xl:text-left transition-all duration-700 ease-out py-8 xl:py-12 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-red-100 backdrop-blur-md w-fit mb-6 shadow-sm">
            <Sparkles size={12} className="text-red-500" />
            <span className="text-[10px] font-bold tracking-wider text-red-800 uppercase">Powered by Vertex AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-neutral-900 tracking-tighter leading-[1.1] mb-6">
            Travel without <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Turbulence.</span>
          </h1>

          <p className="text-lg md:text-2xl text-neutral-500 leading-relaxed max-w-lg mb-12 mx-auto xl:mx-0">
            Real-time predictions, seamless routing, and personalized care for a stress-free journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center xl:justify-start">
            <button
              onClick={handleStart}
              className="px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl font-bold text-lg md:text-2xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
            >
              Start Journey
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* TABLET LOGIN FORM (Visible on Tablet 'md' AND Small Laptops 'lg', Hidden on Desktop 'xl') */}
        <div className="hidden md:flex xl:hidden w-full items-center justify-center relative mt-12 mb-10">
          <div className={`w-full max-w-md transition-all duration-700 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Quick Access</h2>
              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Enter Flight Number</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <p className="text-center text-sm text-neutral-500 mt-4">Sign in to access your personalized journey</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto xl:my-0 flex items-center gap-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Globe size={12} /> MCIA v2.0</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="flex items-center gap-1"><Activity size={12} /> Systems Normal</span>

          {/* Safety Demo Trigger - Hidden for Production */}
          {/* <button
            onClick={() => setShowDisasterDemo(true)}
            className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors opacity-0 hover:opacity-100"
          >
            <ShieldCheck size={12} /> Test Alert
          </button> */}
        </div>
      </div>

      {/* RIGHT SECTION: LOGIN FORM */}
      <div className="hidden xl:flex w-full xl:w-[55%] min-h-[600px] xl:h-full relative items-center justify-center z-10 pb-20 xl:pb-0">

        {/* Orb Glow Behind */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-orange-200 to-rose-200 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>

        {/* Login Card */}
        <div className={`relative w-full max-w-md transition-all duration-1000 ease-out delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-3">Welcome to AURA</h2>
              <p className="text-neutral-600">Enter your flight details to begin your journey</p>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all flex items-center justify-center gap-3 group mb-6"
            >
              <span className="text-lg">Enter Flight Number</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <ShieldCheck size={18} className="text-red-600" />
                <span>Secure and personalized experience</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Activity size={18} className="text-red-600" />
                <span>Real-time flight tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Globe size={18} className="text-red-600" />
                <span>AI-powered navigation assistance</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingScreen;
