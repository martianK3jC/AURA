
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Footprints, Maximize2, X, Compass, ExternalLink, Map, MapPin } from 'lucide-react';
import { ScreenId } from '../types';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

// Standalone Map Component to prevent re-renders
const MapVisualization = ({
  draggable = false,
  mapOffset,
  isDragging,
  onDragStart,
  onDragMove,
  onDragEnd
}: {
  draggable?: boolean;
  mapOffset: { x: number; y: number };
  isDragging: boolean;
  onDragStart: (x: number, y: number) => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
}) => (
  <div
    className="relative w-[375px] h-[600px] transition-transform duration-75 ease-out"
    role="img"
    aria-label="Interactive Map of Terminal 1"
    style={{
      transform: draggable ? `translate(${mapOffset.x}px, ${mapOffset.y}px)` : 'none',
      cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default'
    }}
    onMouseDown={draggable ? (e) => onDragStart(e.clientX, e.clientY) : undefined}
    onMouseMove={draggable ? (e) => onDragMove(e.clientX, e.clientY) : undefined}
    onMouseUp={draggable ? onDragEnd : undefined}
    onMouseLeave={draggable ? onDragEnd : undefined}
    onTouchStart={draggable ? (e) => {
      const touch = e.touches[0];
      onDragStart(touch.clientX, touch.clientY);
    } : undefined}
    onTouchMove={draggable ? (e) => {
      const touch = e.touches[0];
      onDragMove(touch.clientX, touch.clientY);
    } : undefined}
    onTouchEnd={draggable ? onDragEnd : undefined}
  >

    {/* Floor Plan / Walls Container */}
    <div className="absolute inset-0">
      {/* Grid pattern - Darker for visibility */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Walls & Structures - Enhanced Contrast */}
      {/* North Wall */}
      <div className="absolute top-4 left-4 w-40 h-32 border-2 border-slate-300/80 rounded-xl bg-white shadow-sm z-0"></div>
      <div className="absolute top-8 left-8 w-32 h-24 border border-slate-200 rounded-lg bg-slate-50"></div>

      {/* Check-in Area */}
      <div className="absolute top-[150px] left-4 w-40 h-20 border-2 border-slate-300/80 rounded-xl bg-white shadow-sm z-0"></div>
      <div className="absolute top-[154px] left-8 w-8 h-3 bg-red-400/50 rounded-full"></div>

      {/* Corridor */}
      <div className="absolute top-[220px] left-4 w-[350px] h-12 border border-slate-200 bg-white/60"></div>

      {/* Security Areas */}
      <div className="absolute top-[260px] left-20 w-32 h-48 border-2 border-slate-300/80 rounded-2xl bg-white shadow-sm z-0"></div>
      {/* Blue Tint overlay for Security */}
      <div className="absolute top-[260px] left-20 w-32 h-48 rounded-2xl bg-blue-50/30 pointer-events-none"></div>

      <div className="absolute top-[60px] right-8 w-28 h-36 border-2 border-slate-300/80 rounded-2xl bg-white shadow-sm z-0"></div>
      {/* Green Tint overlay for East Security */}
      <div className="absolute top-[60px] right-8 w-28 h-36 rounded-2xl bg-emerald-50/30 pointer-events-none"></div>

      {/* Gates */}
      <div className="absolute top-[220px] right-12 w-24 h-16 border border-slate-300 rounded-lg bg-white/80"></div>
      <div className="absolute bottom-8 left-4 w-44 h-32 border-2 border-orange-200 rounded-2xl bg-white shadow-sm"></div>
    </div>

    {/* Area Labels - High Contrast */}
    <div className="absolute top-8 left-8 text-[10px] text-slate-500 font-bold bg-white/95 px-2 py-1 rounded-md shadow-sm border border-slate-100 pointer-events-none z-10">Terminal 1</div>
    <div className="absolute top-[154px] left-8 text-[9px] text-orange-600 font-bold bg-orange-50/95 px-2 py-0.5 rounded-md border border-orange-100 pointer-events-none z-10">Check-in</div>
    <div className="absolute top-[268px] left-24 text-[9px] text-blue-600 font-bold bg-blue-50/95 px-2 py-0.5 rounded-md border border-blue-100 pointer-events-none z-10">Main Security</div>
    <div className="absolute top-[68px] right-12 text-[9px] text-emerald-600 font-bold bg-emerald-50/95 px-2 py-0.5 rounded-md border border-emerald-100 pointer-events-none z-10">East Security</div>

    {/* CONGESTION ZONES */}
    <div className="absolute top-[340px] left-[80px] w-40 h-40 pointer-events-none z-0">
      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute inset-2 border-4 border-red-500/40 rounded-full border-dashed animate-spin-slow opacity-70"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50/95 px-3 py-1.5 rounded-lg border-2 border-red-200 shadow-lg whitespace-nowrap backdrop-blur-md animate-pulse">
          ⚠️ High Congestion
        </span>
      </div>
    </div>

    {/* Path SVG - Smart Route */}
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

    {/* DIV 1: You are here Group */}
    <div className="absolute left-[60px] top-[450px] z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16">
        <div className="w-16 h-16 bg-red-500/20 rounded-full animate-ping absolute opacity-75"></div>
        <div className="w-8 h-8 bg-red-500/40 rounded-full animate-pulse absolute"></div>
        <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444] relative z-10 border-2 border-white"></div>
      </div>
      <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
        <div className="flex flex-col items-center animate-bounce">
          <div className="bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-400/50 shadow-md mb-1 whitespace-nowrap">
            You are here
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-600/90"></div>
        </div>
      </div>
    </div>

    {/* DIV 2: Security Point Group */}
    <div className="absolute left-[300px] top-[200px] z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6">
        <div className="w-6 h-6 bg-emerald-500/30 rounded-full animate-pulse absolute"></div>
        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse relative z-10"></div>
        <div className="w-1.5 h-1.5 bg-white rounded-full absolute z-20"></div>
      </div>
      <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-400/50 shadow-md mb-1 flex items-center gap-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            Security Point
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-600/90"></div>
        </div>
      </div>
    </div>
  </div>
);

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

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">

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
          <div className="relative h-[50vh] flex-shrink-0 px-0 md:px-3 pt-0 pb-0">
            <div className="h-full w-full bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200/60 md:border md:rounded-3xl md:shadow-inner">

              {/* Centered Map Content Container - Draggable */}
              <div className="scale-90 origin-center sm:scale-100">
                <MapVisualization
                  draggable={true}
                  mapOffset={mapOffset}
                  isDragging={isDragging}
                  onDragStart={handleDragStart}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                />
              </div>

              <div className="absolute top-6 left-6 bg-red-50/90 backdrop-blur-md px-3 py-1 rounded-full border border-red-100 flex items-center gap-2 pointer-events-none z-40 shadow-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-red-600 font-bold tracking-wide uppercase">LIVE DATA</span>
              </div>

              {/* EXPAND ICON centered */}
              <button
                onClick={() => setIsMapFullscreen(true)}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 shadow-lg flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500/50 backdrop-blur-sm transition-all hover:scale-105"
                aria-label="Expand map to fullscreen"
              >
                <Maximize2 size={14} className="text-slate-600 group-hover:scale-110" />
                <span className="text-xs text-slate-700 font-bold">Expand</span>
              </button>

              {/* GOOGLE MAPS BTN - Bottom Right */}
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="absolute bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                title="Open in Google Maps"
              >
                <Map size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Smart Route Found Component */}
          <div className="px-5 pt-6 pb-12">
            <GlassCard variant="elevated" className="rounded-3xl shadow-xl border-0 overflow-hidden ring-1 ring-slate-100">

              {/* Header Section */}
              <div className="p-6 md:p-8 pb-6 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
                    <Compass size={14} className="text-white" />
                  </div>
                  <h3 className="text-emerald-500 font-bold text-lg tracking-tight">
                    Smart Route Found
                  </h3>
                </div>

                <p className="text-slate-600 text-[15px] mb-8 font-medium">
                  Main queue congested. East Wing is faster.
                </p>

                {/* Metrics Stats */}
                <div className="flex gap-4 mb-8">
                  <div className="bg-emerald-50/80 px-5 py-4 rounded-xl flex-1 border border-emerald-100/50">
                    <div className="text-[10px] text-emerald-800/70 font-bold uppercase tracking-wider mb-1">Time Saved</div>
                    <div className="text-3xl font-bold text-emerald-600 tracking-tighter">15m</div>
                  </div>
                  <div className="bg-blue-50/80 px-5 py-4 rounded-xl flex-1 border border-blue-100/50">
                    <div className="text-[10px] text-blue-800/70 font-bold uppercase tracking-wider mb-1">Distance</div>
                    <div className="text-3xl font-bold text-blue-600 tracking-tighter">350m</div>
                  </div>
                </div>

                {/* Primary CTA */}
                <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 text-[16px] active:scale-[0.99]">
                  <Footprints size={20} className="stroke-[2.5]" />
                  Start Navigation
                </button>
              </div>

              {/* Route Details Content */}
              <div className="px-6 md:px-8 pb-8 bg-white border-t border-slate-100">

                {/* Info Box */}
                <div className="mt-6 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                  Main queue is congested (25 mins wait). The East Wing entrance has faster clearance (&lt;10 mins) and is only an 80m walk from your current position.
                </div>

                {/* Route Timeline */}
                <div>
                  <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 text-sm">
                    <Footprints size={16} className="text-blue-600" />
                    Route Directions
                  </h4>

                  <div className="relative pl-2.5">
                    {/* Vertical Line */}
                    <div className="absolute top-2 bottom-4 left-[21px] w-[2px] bg-slate-200"></div>

                    <div className="space-y-6">

                      {/* Step 1 - Current (Highlighted) */}
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="relative z-10 w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 border-[3px] border-white shadow-sm ring-1 ring-blue-200">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="flex-1 bg-blue-50/60 rounded-xl p-4 border border-blue-100">
                            <h5 className="text-blue-700 text-sm font-bold flex items-center gap-2 mb-1">
                              <MapPin size={14} className="fill-blue-600 text-blue-600" />
                              You are here
                            </h5>
                            <p className="text-slate-600 text-xs font-medium">Exit Terminal 1 Lobby • Walk towards North Exit</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex items-start gap-4">
                        <div className="relative z-10 w-11 h-11 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-slate-300 rounded-full ring-4 ring-white"></div>
                        </div>
                        <div className="pt-2">
                          <h5 className="text-slate-900 text-sm font-bold mb-0.5">Take Skybridge A</h5>
                          <p className="text-slate-500 text-xs">Use escalator to 2nd floor • 2 mins</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex items-start gap-4">
                        <div className="relative z-10 w-11 h-11 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-slate-300 rounded-full ring-4 ring-white"></div>
                        </div>
                        <div className="pt-2">
                          <h5 className="text-slate-900 text-sm font-bold mb-0.5">Turn Right at Duty Free</h5>
                          <p className="text-slate-500 text-xs">Follow signs for "East Wing Security"</p>
                        </div>
                      </div>

                      {/* Step 4 - Destination */}
                      <div className="relative flex items-start gap-4">
                        <div className="relative z-10 w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100 border-[3px] border-white shadow-sm ring-1 ring-emerald-200">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="pt-2">
                          <h5 className="text-emerald-700 text-sm font-bold mb-0.5">Arrive East Wing Security</h5>
                          <p className="text-slate-500 text-xs font-medium">Queue Time: &lt;5 mins</p>
                        </div>
                      </div>

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
                <MapVisualization
                  draggable={true}
                  mapOffset={mapOffset}
                  isDragging={isDragging}
                  onDragStart={handleDragStart}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                />
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
