import React, { useEffect, useState } from 'react';
import { ScreenId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Globe, Activity, Plane, Clock, MapPin } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

import DisasterAlertModal from '../components/DisasterAlertModal';

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">AURA</h1>
              <p className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">Unified Assistant</p>
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
            Experience the future of airport navigation. Real-time predictions, seamless routing, and personalized care.
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

        {/* TABLET VISUALIZATION (Visible on Tablet 'md' AND Small Laptops 'lg', Hidden on Desktop 'xl') */}
        <div className="hidden md:flex xl:hidden w-full h-[600px] items-start justify-center relative mt-20 mb-10 perspective-[2000px]">
          <div className={`relative w-[480px] h-[600px] scale-100 origin-top transition-all duration-1000 ease-out delay-300 transform-style-3d ${isAnimated ? 'opacity-100 rotate-y-[-12deg] rotate-x-[5deg] translate-y-[-50px]' : 'opacity-0 translate-y-20'}`}>
            {/* Card 1: Flight Status (Back) */}
            <div className="absolute top-[-40px] right-[-50px] w-80 p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl transform translate-z-[-50px] animate-float-slow">
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm font-bold text-neutral-500 tracking-wider">FLIGHT STATUS</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">ON TIME</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Plane className="text-red-500" size={24} />
                </div>
                <div>
                  <p className="font-bold text-2xl text-neutral-800">PR 2849</p>
                  <p className="text-base text-neutral-500 font-medium">To Manila (MNL)</p>
                </div>
              </div>
            </div>

            {/* Card 2: Main Map (Center) */}
            <div className="absolute top-[110px] left-0 right-0 h-[400px] bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-8 transform translate-z-[20px] animate-float">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <MapPin className="text-red-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-neutral-900 leading-tight">Live Route</p>
                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-wide">Optimal path found</p>
                  </div>
                </div>
                <div className="w-14 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                  <ArrowRight className="text-white" size={20} />
                </div>
              </div>
              <div className="w-full h-52 bg-neutral-100/80 rounded-3xl overflow-hidden relative mb-6 border border-white/50">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                <svg className="absolute inset-0 w-full h-full">
                  <path d="M 50 150 Q 100 50 200 80 T 360 100" fill="none" stroke="#DC2626" strokeWidth="4" strokeDasharray="8 6" />
                  <circle cx="360" cy="100" r="8" fill="#DC2626" />
                  <circle cx="360" cy="100" r="20" fill="#DC2626" opacity="0.2" className="animate-ping" />
                </svg>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-neutral-600 uppercase tracking-widest px-1">
                <span>Security Check A</span>
                <span className="text-red-600">12 min wait</span>
              </div>
            </div>

            {/* Card 3: Notification (Front) */}
            <div className="absolute bottom-0 left-[-40px] w-80 p-6 bg-red-600 text-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-red-900/30 transform translate-z-[60px] animate-float-fast">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-xl leading-tight">Boarding in 25m</p>
                  <p className="text-red-100 text-sm font-medium mt-0.5">Gate 4 • Terminal 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto xl:my-0 flex items-center gap-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Globe size={12} /> MCIA v2.0</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
          <span className="flex items-center gap-1"><Activity size={12} /> Systems Normal</span>

          {/* Safety Demo Trigger */}
          <button
            onClick={() => setShowDisasterDemo(true)}
            className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors"
          >
            <ShieldCheck size={12} /> Simulate Typhoon
          </button>
        </div>
      </div>

      {/* RIGHT SECTION: HERO VISUALIZATION (Levitating Cards) */}
      <div className="hidden xl:flex w-full xl:w-[55%] min-h-[600px] xl:h-full relative items-center justify-center z-10 perspective-[2000px] pb-20 xl:pb-0">

        {/* Orb Glow Behind */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-orange-200 to-rose-200 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>

        {/* Floating Glass UI Stack - Scale Updated */}
        <div className={`relative w-[480px] h-[600px] md:scale-75 lg:scale-90 xl:scale-100 transition-all duration-1000 ease-out delay-300 transform-style-3d ${isAnimated ? 'opacity-100 rotate-y-[-12deg] rotate-x-[5deg] translate-y-12' : 'opacity-0 translate-y-20'}`}>

          {/* Card 1: Flight Status (Back) - Enlarged */}
          <div className="absolute top-0 right-[-50px] w-80 p-6 bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl transform translate-z-[-50px] animate-float-slow">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs font-bold text-neutral-500 tracking-wider">FLIGHT STATUS</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">ON TIME</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Plane className="text-red-500" size={24} />
              </div>
              <div>
                <p className="font-bold text-xl text-neutral-800">PR 2849</p>
                <p className="text-sm text-neutral-500 font-medium">To Manila (MNL)</p>
              </div>
            </div>
          </div>

          {/* Card 2: Main Map (Center) - Enlarged */}
          <div className="absolute top-[110px] left-0 right-0 h-[400px] bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-8 transform translate-z-[20px] animate-float">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <MapPin className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg text-neutral-900 leading-tight">Live Route</p>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wide">Optimal path found</p>
                </div>
              </div>
              <div className="w-14 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                <ArrowRight className="text-white" size={20} />
              </div>
            </div>

            {/* Abstract Map UI */}
            <div className="w-full h-52 bg-neutral-100/80 rounded-3xl overflow-hidden relative mb-6 border border-white/50">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 50 150 Q 100 50 200 80 T 360 100" fill="none" stroke="#DC2626" strokeWidth="4" strokeDasharray="8 6" />
                <circle cx="360" cy="100" r="8" fill="#DC2626" />
                <circle cx="360" cy="100" r="20" fill="#DC2626" opacity="0.2" className="animate-ping" />
              </svg>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-neutral-600 uppercase tracking-widest px-1">
              <span>Security Check A</span>
              <span className="text-red-600">12 min wait</span>
            </div>
          </div>

          {/* Card 3: Notification (Front) - Enlarged */}
          <div className="absolute bottom-12 left-[-40px] w-72 p-5 bg-red-600 text-white backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-red-900/30 transform translate-z-[60px] animate-float-fast">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-base leading-tight">Boarding in 25m</p>
                <p className="text-red-100 text-xs font-medium mt-0.5">Gate 4 • Terminal 1</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
