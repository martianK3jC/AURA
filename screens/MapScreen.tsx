import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Navigation, Footprints, Maximize2, X } from 'lucide-react';
import { ScreenId } from '../types';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const MapScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Map visualization component (reusable)
  const MapVisualization = ({ isFullscreen = false }) => (
    <div className={`h-full w-full ${isFullscreen ? 'bg-slate-900' : 'bg-transparent'} relative overflow-hidden`}>
      {/* Floor Plan */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 right-10 h-2 bg-slate-500"></div>
        <div className="absolute top-10 left-10 w-2 h-60 bg-slate-500"></div>
        <div className="absolute bottom-40 left-10 right-10 h-2 bg-slate-500"></div>
        <div className="absolute top-10 right-20 w-2 h-40 bg-slate-500"></div>
      </div>

      {/* Labels */}
      <div className="absolute top-24 left-4 text-xs text-slate-500 font-bold bg-slate-900/50 px-2 py-1 rounded">Terminal 1 Entry</div>
      <div className="absolute top-24 right-4 text-xs text-slate-500 font-bold bg-slate-900/50 px-2 py-1 rounded">Check-in</div>

      {/* Heatmaps */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-500/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-emerald-500/30 rounded-full blur-2xl"></div>

      {/* Path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <path 
          d="M 50 400 Q 150 400 180 300 T 300 150" 
          stroke="#22d3ee" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="6 4" 
          className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="400" r="6" fill="#3b82f6" className="animate-pulse" />
        <circle cx="300" cy="150" r="6" fill="#10b981" />
      </svg>

      {/* Live Indicator */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 z-20">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        <span className="text-xs text-white font-mono">LIVE DATA</span>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-950">
      
      {/* Header */}
      <div className="flex-shrink-0 p-4 pt-6 z-30 bg-slate-950">
        <button onClick={() => onNavigate('scenario-b')} className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors">
          <span>←</span> Back to Timeline
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Security Checkpoint A</h2>
            <p className="text-sm text-slate-400">Terminal 1 Entry</p>
          </div>
          {/* Toggle */}
          <div className="flex gap-1 glass-card rounded-full p-1 bg-slate-900/80 backdrop-blur-md">
            <button onClick={() => onNavigate('scenario-a')} className="px-3 py-1 text-slate-400 rounded-full text-xs hover:text-white transition-colors">A</button>
            <button onClick={() => onNavigate('scenario-b')} className="px-3 py-1 text-slate-400 rounded-full text-xs hover:text-white transition-colors">B</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">C</button>
          </div>
        </div>
      </div>

      {/* Map Visualization Area - Contained in Glass Box */}
      <div className="relative h-[35vh] flex-shrink-0 p-2">
        <div className="h-full w-full bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden shadow-lg">
          <MapVisualization />
          
          {/* EXPAND ICON - NEW - Bottom Center */}
          <button 
            onClick={() => setIsMapFullscreen(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50 hover:bg-slate-700 transition-all shadow-lg flex items-center gap-2 group"
          >
            <Maximize2 size={16} className="text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs text-white font-medium">Expand</span>
          </button>
        </div>
      </div>

      {/* Smart Route Found Component */}
      <div 
        className={`fixed left-0 right-0 bottom-20 z-30 mx-auto max-w-md transition-all duration-500 ease-in-out ${
          isExpanded ? 'h-[75%]' : 'h-auto'
        }`}
      >
        <div className="glass-card bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 h-full flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] m-2">
          
          {/* Header - Clickable for toggle */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-4 cursor-pointer border-b border-white/5 flex-shrink-0"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                🎯 Smart Route Found
              </h3>
              {isExpanded ? <ChevronDown className="text-slate-400" size={20} /> : <ChevronUp className="text-slate-400" size={20} />}
            </div>
            
            {!isExpanded && (
              <p className="text-slate-300 text-sm line-clamp-1">
                Main queue congested. East Wing is faster.
              </p>
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              
              {isExpanded && (
                <>
                  {/* Stats - Only visible when expanded */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
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

                  <div className="space-y-6">
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
                        <div className="mb-6 ml-6 relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900"></div>
                          <h5 className="text-white text-sm font-medium">Exit Terminal 1 Lobby</h5>
                          <p className="text-slate-500 text-xs">Walk straight towards North Exit</p>
                        </div>
                        <div className="mb-6 ml-6 relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                          <h5 className="text-white text-sm font-medium">Take Skybridge A</h5>
                          <p className="text-slate-500 text-xs">Use escalator to 2nd floor • 2 mins</p>
                        </div>
                        <div className="mb-6 ml-6 relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                          <h5 className="text-white text-sm font-medium">Turn Right at Duty Free</h5>
                          <p className="text-slate-500 text-xs">Follow signs for "East Wing Security"</p>
                        </div>
                        <div className="ml-6 relative">
                          <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          <h5 className="text-emerald-400 text-sm font-bold">Arrive East Wing Security</h5>
                          <p className="text-slate-400 text-xs">Queue Time: &lt;5 mins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sticky Button */}
          <div className="p-4 border-t border-white/5 bg-slate-900/50 flex-shrink-0">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Navigation size={18} />
              Navigate via AR
            </button>
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
          <div className="flex-1 relative overflow-hidden">
            <MapVisualization isFullscreen={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;