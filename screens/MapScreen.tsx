
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Footprints, Maximize2, X, Compass, ExternalLink, Map } from 'lucide-react';
import { ScreenId } from '../types';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const MapScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Draggable map state
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Initial offset to show the full path nicely
  const initialOffset = {
    x: 60,
    y: -100
  };

  // Initialize map centered
  useEffect(() => {
    setMapOffset(initialOffset);
  }, []);

  // Mouse/Touch handlers for dragging
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - mapOffset.x,
      y: clientY - mapOffset.y
    });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;

    // Constrain the offset
    const maxDragX = 80;
    const maxDragY = 120;

    const constrainedX = Math.max(-maxDragX, Math.min(maxDragX, newX));
    const constrainedY = Math.max(-maxDragY, Math.min(maxDragY, newY));

    setMapOffset({
      x: constrainedX,
      y: constrainedY
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Map visualization component
  const MapContent = ({ draggable = false }: { draggable?: boolean }) => (
    <div
      className="relative w-[375px] h-[600px] transition-transform duration-200"
      role="img"
      aria-label="Interactive Map of Terminal 1 showing check-in, security, and gates"
      style={{
        transform: draggable ? `translate(${mapOffset.x}px, ${mapOffset.y}px)` : 'none',
        cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default'
      }}
      onMouseDown={draggable ? (e) => handleDragStart(e.clientX, e.clientY) : undefined}
      onMouseMove={draggable ? (e) => handleDragMove(e.clientX, e.clientY) : undefined}
      onMouseUp={draggable ? handleDragEnd : undefined}
      onMouseLeave={draggable ? handleDragEnd : undefined}
      onTouchStart={draggable ? (e) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
      } : undefined}
      onTouchMove={draggable ? (e) => {
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
      } : undefined}
      onTouchEnd={draggable ? handleDragEnd : undefined}
    >

      {/* Floor Plan / Walls Container */}
      <div className="absolute inset-0">
        {/* Grid pattern - Tech Theme */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Walls & Structures - Cool Neutrals */}
        <div className="absolute top-4 left-4 w-40 h-32 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"></div>
        <div className="absolute top-8 left-8 w-32 h-24 border border-slate-100 rounded-lg bg-slate-50/50"></div>

        {/* Check-in */}
        <div className="absolute top-[150px] left-4 w-40 h-20 border-2 border-slate-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm"></div>
        <div className="absolute top-[154px] left-8 w-8 h-3 bg-red-400/30 rounded-full"></div>

        {/* Corridor */}
        <div className="absolute top-[220px] left-4 w-[350px] h-12 border border-orange-100 bg-white/40"></div>

        {/* Security Areas - Light Blue/Teal accents for contrast */}
        <div className="absolute top-[260px] left-20 w-32 h-48 border-2 border-blue-400/30 rounded-2xl bg-blue-50/50"></div>
        <div className="absolute top-[60px] right-8 w-28 h-36 border-2 border-emerald-400/30 rounded-2xl bg-emerald-50/50"></div>

        {/* Gates */}
        <div className="absolute top-[220px] right-12 w-24 h-16 border border-orange-200/60 rounded-lg bg-white/60"></div>
        <div className="absolute bottom-8 left-4 w-44 h-32 border-2 border-orange-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm"></div>
      </div>

      {/* Area Labels - Dark Text for readability on light map */}
      <div className="absolute top-8 left-8 text-[10px] text-orange-900/60 font-bold bg-white/90 px-2 py-1 rounded-md shadow-sm pointer-events-none">Terminal 1</div>
      <div className="absolute top-[154px] left-8 text-[9px] text-orange-600 font-bold bg-orange-50/90 px-2 py-0.5 rounded-md border border-orange-200 pointer-events-none">Check-in</div>
      <div className="absolute top-[268px] left-24 text-[9px] text-blue-600 font-bold bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-200 pointer-events-none">Main Security</div>
      <div className="absolute top-[68px] right-12 text-[9px] text-emerald-600 font-bold bg-emerald-50/90 px-2 py-0.5 rounded-md border border-emerald-200 pointer-events-none">East Security</div>

      {/* CONGESTION ZONES - Enhanced Visibility */}

      {/* 1. High Congestion Zone (Red) - More Prominent */}
      <div className="absolute top-[340px] left-[80px] w-40 h-40 pointer-events-none z-0">
        {/* Stronger blob */}
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
        {/* Pulsing ring for attention */}
        <div className="absolute inset-2 border-4 border-red-500/40 rounded-full border-dashed animate-spin-slow opacity-70"></div>
        {/* Warning Label - Larger */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50/95 px-3 py-1.5 rounded-lg border-2 border-red-200 shadow-lg whitespace-nowrap backdrop-blur-md animate-pulse">
            ⚠️ High Congestion
          </span>
        </div>
      </div>

      {/* Path SVG - INDIGO Theme (Smart Route) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 375 600">
        <path
          d="M 60 450 Q 150 450 180 350 T 300 200"
          stroke="#4f46e5"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 4"
          className="drop-shadow-[0_0_8px_rgba(79,70,229,0.4)]"
        >
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* DIV 1: You are here Group (Label + Checkpoint) */}
      <div className="absolute left-[60px] top-[450px] z-20">
        {/* Radar Effect Marker - MCIA RED */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16">
          <div className="w-16 h-16 bg-red-500/20 rounded-full animate-ping absolute opacity-75"></div>
          <div className="w-8 h-8 bg-red-500/40 rounded-full animate-pulse absolute"></div>
          <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444] relative z-10 border-2 border-white"></div>
        </div>

        {/* Label Tooltip */}
        <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <div className="flex flex-col items-center animate-bounce">
            <div className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-400/50 shadow-[0_4px_15px_rgba(220,38,38,0.4)] mb-1 whitespace-nowrap">
              You are here
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-600/90"></div>
          </div>
        </div>
      </div>

      {/* DIV 2: Security Point Group (Label + Checkpoint) */}
      <div className="absolute left-[300px] top-[200px] z-20">
        {/* Checkpoint Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6">
          <div className="w-6 h-6 bg-emerald-500/30 rounded-full animate-pulse absolute"></div>
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse relative z-10"></div>
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute z-20"></div>
        </div>

        {/* Label Tooltip */}
        <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-400/50 shadow-[0_4px_15px_rgba(5,150,105,0.4)] mb-1 flex items-center gap-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              Security Point
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-600/90"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-transparent overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0 p-4 pt-safe z-30">
        <button onClick={() => onNavigate('scenario-b')} className="text-neutral-500 hover:text-neutral-900 mb-4 flex items-center gap-2 transition-colors">
          <span>←</span> Back to Timeline
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Security Checkpoint A</h2>
            <p className="text-sm text-neutral-600">Terminal 1 Entry</p>
          </div>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Map Visualization Area */}
          <div className="relative h-[50vh] flex-shrink-0 px-3 pt-2 pb-4">
            <div className="h-full w-full bg-white rounded-2xl border border-neutral-200 relative overflow-hidden shadow-lg flex items-center justify-center">

              {/* Centered Map Content Container - Draggable */}
              <div className="scale-90 origin-center sm:scale-100">
                <MapContent draggable={true} />
              </div>

              <div className="absolute top-4 left-4 bg-red-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 flex items-center gap-2 pointer-events-none z-40 shadow-sm">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                <span className="text-xs text-red-700 font-mono font-bold tracking-tight">LIVE DATA</span>
              </div>

              {/* EXPAND ICON */}
              <button
                onClick={() => setIsMapFullscreen(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/90 px-4 py-2 rounded-full border border-neutral-200 hover:bg-neutral-50 hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 backdrop-blur-md"
                aria-label="Expand map to fullscreen"
              >
                <Maximize2 size={16} className="text-neutral-700 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-neutral-900 font-bold">Expand</span>
              </button>

              {/* GOOGLE MAPS BTN */}
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="absolute bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105 p-3 rounded-full border border-blue-500 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
                title="Open in Google Maps"
                aria-label="Open location in Google Maps"
              >
                <Map size={20} className="text-white" />
              </button>

              {/* COMPASS */}
              <div className="absolute top-14 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full border border-orange-200 z-40 pointer-events-none shadow-lg">
                <Compass size={20} className="text-blue-500 rotate-45" />
              </div>
            </div>
          </div>

          {/* Smart Route Found Component - Now Scrollable */}
          <div className="px-6 pb-6">
            <GlassCard variant="elevated" className="rounded-2xl shadow-lg">

              {/* Header */}
              <div className="p-6 border-b border-neutral-200">
                <h3 className="text-green-600 font-bold text-xl flex items-center gap-2 mb-3">
                  🎯 Smart Route Found
                </h3>
                <p className="text-neutral-700 text-sm mb-6 leading-relaxed">
                  Main queue congested. East Wing is faster.
                </p>

                {/* Stats */}
                <div className="flex gap-4">
                  <div className="bg-green-50 px-5 py-3 rounded-xl border border-green-200 flex-1">
                    <div className="text-xs text-green-800 font-bold uppercase tracking-wide mb-1">Time Saved</div>
                    <div className="text-2xl font-bold text-green-600">15m</div>
                  </div>
                  <div className="bg-blue-50 px-5 py-3 rounded-xl border border-blue-200 flex-1">
                    <div className="text-xs text-blue-800 font-bold uppercase tracking-wide mb-1">Distance</div>
                    <div className="text-2xl font-bold text-blue-600">350m</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(211,47,47,0.3)] hover:shadow-[0_8px_25px_rgba(211,47,47,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 hover:-translate-y-0.5">
                    <Footprints size={20} />
                    Start Navigation
                  </button>

                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6">
                {/* Summary */}
                <p className="text-neutral-700 text-sm bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  Main queue is congested (25 mins wait). The East Wing entrance has faster clearance (&lt;10 mins) and is only an 80m walk from your current position.
                </p>

                {/* Route Directions */}
                <div>
                  <h4 className="text-neutral-900 font-semibold mb-3 flex items-center gap-2">
                    <Footprints size={16} className="text-blue-600" />
                    Route Directions
                  </h4>
                  <div className="space-y-0 relative border-l-2 border-neutral-300 ml-2">

                    {/* Step 1 - Current Location */}
                    <div className="mb-6 ml-6 relative">
                      <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 -ml-2">
                        <h5 className="text-blue-600 text-sm font-bold flex items-center gap-2 mb-1">
                          📍 You are here
                        </h5>
                        <p className="text-neutral-600 text-xs">Exit Terminal 1 Lobby • Walk towards North Exit</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="mb-10 ml-6 relative">
                      <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-neutral-400 border-2 border-white"></div>
                      <h5 className="text-neutral-900 text-sm font-medium mb-1">Take Skybridge A</h5>
                      <p className="text-neutral-600 text-xs">Use escalator to 2nd floor • 2 mins</p>
                    </div>

                    {/* Step 3 */}
                    <div className="mb-8 ml-6 relative">
                      <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-neutral-400 border-2 border-white"></div>
                      <h5 className="text-neutral-900 text-sm font-medium mb-1">Turn Right at Duty Free</h5>
                      <p className="text-neutral-600 text-xs">Follow signs for "East Wing Security"</p>
                    </div>

                    {/* Step 4 - Destination */}
                    <div className="ml-6 relative">
                      <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <h5 className="text-green-600 text-sm font-bold mb-1">Arrive East Wing Security</h5>
                      <p className="text-neutral-600 text-xs">Queue Time: &lt;5 mins</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Fullscreen Map Modal */}
        {isMapFullscreen && (
          <div className="fixed inset-0 z-[9999] bg-neutral-950/95 backdrop-blur-sm flex flex-col">
            {/* Modal Header - Consistent with AURA theme */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-md flex-shrink-0 pt-safe">
              <h2 className="text-lg font-bold text-white">Full Map View</h2>
              <button
                onClick={() => setIsMapFullscreen(false)}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all text-neutral-400 hover:text-white"
                aria-label="Close Full Map"
              >
                <X size={24} />
              </button>
            </div>

            {/* Full Map */}
            <div className="flex-1 relative overflow-hidden bg-neutral-50 flex items-center justify-center">
              <div className="scale-110 origin-center">
                <MapContent draggable={true} />
              </div>
            </div>

            {/* LIVE DATA - Consistent badge */}
            <div className="absolute top-20 right-4 bg-red-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/30 flex items-center gap-2 z-40 pointer-events-none shadow-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-red-700 font-mono font-bold tracking-tight">LIVE DATA</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;
