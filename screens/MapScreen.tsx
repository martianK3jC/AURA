
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Footprints, Maximize2, X } from 'lucide-react';
import { ScreenId } from '../types';

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
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Walls & Structures */}
        <div className="absolute top-4 left-4 w-40 h-32 border-2 border-slate-600/50 rounded bg-slate-800/20"></div>
        <div className="absolute top-8 left-8 w-32 h-24 border border-slate-600/30 rounded-sm"></div>
        
        {/* Check-in */}
        <div className="absolute top-[150px] left-4 w-40 h-20 border-2 border-slate-600/50 rounded bg-slate-700/20"></div>
        <div className="absolute top-[154px] left-8 w-8 h-3 bg-blue-500/30 rounded-sm"></div>
        
        {/* Corridor */}
        <div className="absolute top-[220px] left-4 w-[350px] h-12 border border-slate-600/40 bg-slate-800/10"></div>
        
        {/* Security Areas */}
        <div className="absolute top-[260px] left-20 w-32 h-48 border-2 border-blue-500/40 rounded-lg bg-blue-900/10"></div>
        <div className="absolute top-[60px] right-8 w-28 h-36 border-2 border-emerald-500/40 rounded-lg bg-emerald-900/10"></div>
        
        {/* Gates */}
        <div className="absolute top-[220px] right-12 w-24 h-16 border border-slate-600/40 rounded bg-slate-700/20"></div>
        <div className="absolute bottom-8 left-4 w-44 h-32 border-2 border-slate-600/50 rounded-lg bg-slate-800/20"></div>
      </div>

      {/* Area Labels */}
      <div className="absolute top-8 left-8 text-[10px] text-slate-400 font-bold bg-slate-900/70 px-2 py-1 rounded backdrop-blur-sm border border-white/5 pointer-events-none">Terminal 1</div>
      <div className="absolute top-[154px] left-8 text-[9px] text-blue-400 font-bold bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-sm border border-blue-500/20 pointer-events-none">Check-in</div>
      <div className="absolute top-[268px] left-24 text-[9px] text-blue-400 font-bold bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-sm border border-blue-500/20 pointer-events-none">Main Security</div>
      <div className="absolute top-[68px] right-12 text-[9px] text-emerald-400 font-bold bg-slate-900/70 px-2 py-0.5 rounded backdrop-blur-sm border border-emerald-500/20 pointer-events-none">East Security</div>

      {/* CONGESTION ZONES - Explicitly Labeled */}
      
      {/* 1. High Congestion Zone (Red) */}
      <div className="absolute top-[340px] left-[80px] w-40 h-40 pointer-events-none z-0">
         {/* Blob */}
         <div className="absolute inset-0 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
         {/* Ring Border for definition */}
         <div className="absolute inset-2 border-2 border-red-500/30 rounded-full border-dashed animate-spin-slow opacity-50"></div>
         {/* Warning Label */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="flex items-center gap-1 text-[10px] font-bold text-red-200 bg-red-950/90 px-2 py-1 rounded border border-red-500/50 shadow-lg whitespace-nowrap backdrop-blur-md">
               ⚠️ High Congestion
            </span>
         </div>
      </div>
      
      {/* Path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 375 600">
        <path 
          d="M 60 450 Q 150 450 180 350 T 300 200" 
          stroke="#22d3ee" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="6 4" 
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* DIV 1: You are here Group (Label + Checkpoint) */}
      <div className="absolute left-[60px] top-[450px] z-20">
        {/* Radar Effect Marker - Enhanced Visibility */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16">
           <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute opacity-75"></div>
           <div className="w-8 h-8 bg-blue-500/40 rounded-full animate-pulse absolute"></div>
           <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] relative z-10 border-2 border-white"></div>
        </div>

        {/* Label Tooltip */}
        <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <div className="flex flex-col items-center animate-bounce">
            <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-blue-400/50 shadow-[0_4px_15px_rgba(37,99,235,0.4)] mb-1 whitespace-nowrap">
              You are here
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600/90"></div>
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
      <div className="flex-shrink-0 p-4 pt-6 z-30">
        <button onClick={() => onNavigate('scenario-b')} className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors">
          <span>←</span> Back to Timeline
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Security Checkpoint A</h2>
            <p className="text-sm text-slate-400">Terminal 1 Entry</p>
          </div>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pb-24">
        
        {/* Map Visualization Area */}
        <div className="relative h-[50vh] flex-shrink-0 px-3 pt-2 pb-4">
          <div className="h-full w-full bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden shadow-lg flex items-center justify-center">
            
            {/* Centered Map Content Container - Draggable */}
            <div className="scale-90 origin-center sm:scale-100">
              <MapContent draggable={true} />
            </div>
            
            {/* LIVE DATA */}
            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 z-40 pointer-events-none">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-white font-mono">LIVE DATA</span>
            </div>
            
            {/* Drag Hint */}
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-600/30 z-40 pointer-events-none">
              <span className="text-[10px] text-slate-300 font-medium">👆 Drag to explore</span>
            </div>
            
            {/* EXPAND ICON */}
            <button 
              onClick={() => setIsMapFullscreen(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50 hover:bg-slate-700 transition-all shadow-lg flex items-center gap-2 group"
            >
              <Maximize2 size={16} className="text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs text-white font-medium">Expand</span>
            </button>
          </div>
        </div>

        {/* Smart Route Found Component - Now Scrollable */}
        <div className="px-3 pb-4">
          <div className="glass-card bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            
            {/* Header */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-emerald-400 font-bold text-lg flex items-center gap-2 mb-2">
                🎯 Smart Route Found
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                Main queue congested. East Wing is faster.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <div className="text-emerald-400 font-bold text-lg">15m</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Saved</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <div className="text-white font-bold text-lg">80m</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Walk</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                  <div className="text-violet-400 font-bold text-lg">95%</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Conf.</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Summary */}
              <p className="text-slate-300 text-sm bg-white/5 p-3 rounded-lg border border-white/5">
                Main queue is congested (25 mins wait). The East Wing entrance has faster clearance (&lt;10 mins) and is only an 80m walk from your current position.
              </p>

              {/* Route Directions */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Footprints size={16} className="text-blue-400" /> 
                  Route Directions
                </h4>
                <div className="space-y-0 relative border-l-2 border-white/10 ml-2">
                  
                  {/* Step 1 - Current Location */}
                  <div className="mb-6 ml-6 relative">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900 shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 -ml-2">
                      <h5 className="text-blue-400 text-sm font-bold flex items-center gap-2">
                        📍 You are here
                      </h5>
                      <p className="text-slate-400 text-xs mt-1">Exit Terminal 1 Lobby • Walk towards North Exit</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="mb-6 ml-6 relative">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                    <h5 className="text-white text-sm font-medium">Take Skybridge A</h5>
                    <p className="text-slate-500 text-xs">Use escalator to 2nd floor • 2 mins</p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="mb-6 ml-6 relative">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                    <h5 className="text-white text-sm font-medium">Turn Right at Duty Free</h5>
                    <p className="text-slate-500 text-xs">Follow signs for "East Wing Security"</p>
                  </div>
                  
                  {/* Step 4 - Destination */}
                  <div className="ml-6 relative">
                    <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <h5 className="text-emerald-400 text-sm font-bold">Arrive East Wing Security</h5>
                    <p className="text-slate-400 text-xs">Queue Time: &lt;5 mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900 flex-shrink-0 pt-safe">
            <h2 className="text-lg font-bold text-white">Full Map View</h2>
            <button 
              onClick={() => setIsMapFullscreen(false)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
          
          {/* Full Map */}
          <div className="flex-1 relative overflow-hidden bg-slate-900 flex items-center justify-center">
            <div className="scale-110 origin-center">
                <MapContent draggable={true} />
            </div>
          </div>
          
          {/* LIVE DATA - Fixed for fullscreen */}
          <div className="absolute top-20 right-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 z-40 pointer-events-none">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-white font-mono">LIVE DATA</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
