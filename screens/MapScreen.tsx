
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Footprints, Maximize2, X, Compass, ExternalLink, Map, MapPin } from 'lucide-react';
import { ScreenId } from '../types';
import GlassCard from '../components/GlassCard';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

import airportMap from '../img/airport.png';

// Standalone Map Component - Interactive
const MapVisualization = ({
  mapOffset,
  scale,
  isDragging
}: {
  mapOffset: { x: number; y: number };
  scale: number;
  isDragging: boolean;
}) => (
  <div
    className="relative w-full h-full bg-gray-200 overflow-hidden"
    role="img"
    aria-label="Terminal 1 Map"
    style={{
      cursor: isDragging ? 'grabbing' : 'grab',
      touchAction: 'none' // Prevent default touch actions like scrolling
    }}
  >
    {/* Map Image Container - transformed */}
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
      style={{
        transform: `translate(${mapOffset.x}px, ${mapOffset.y}px) scale(${scale})`,
        transformOrigin: 'center center'
      }}
    >
      <img
        src={airportMap}
        alt="Terminal Map"
        className="w-full h-full object-contain pointer-events-none"
      />
    </div>
  </div>
);

const MapScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Map State
  const [scale, setScale] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: -100 }); // Initial shift up
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState(0);

  // Helper to calculate distance between touches
  const getPinchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    return Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  };

  // --- Handlers ---

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - mapOffset.x, y: clientY - mapOffset.y });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    setMapOffset({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Touch Handlers (Pinch Zoom + Pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getPinchDistance(e.touches[0], e.touches[1]);
      setLastPinchDistance(dist);
    } else if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Zoom
      const dist = getPinchDistance(e.touches[0], e.touches[1]);
      if (lastPinchDistance > 0) {
        const delta = dist - lastPinchDistance;
        const zoomSensitivity = 0.005;
        // Min scale 1 (fit), Max 4
        setScale(s => Math.max(1, Math.min(4, s + delta * zoomSensitivity)));
      }
      setLastPinchDistance(dist);
    } else if (e.touches.length === 1) {
      // Pan
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if control pressed or explicit intent, usually on map specific area
    // Just allow simple wheel zoom
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    setScale(s => Math.max(1, Math.min(4, s + delta)));
  };

  // Sheet Drag Logic
  const [sheetHeight, setSheetHeight] = useState(25);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const [dragStartSheetY, setDragStartSheetY] = useState(0);
  const [dragStartSheetHeight, setDragStartSheetHeight] = useState(0);

  const handleSheetDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Removed e.stopPropagation() to allow natural scrolling/interaction if needed, 
    // but typically we want to capture drag here.
    // If e.stopPropagation is removed, we might trigger map drag if not careful.
    // DashboardScreen does NOT have stopPropagation.
    setIsDraggingSheet(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartSheetY(clientY);
    setDragStartSheetHeight(sheetHeight);
  };

  const handleSheetDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingSheet) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartSheetY;
    const windowHeight = window.innerHeight;
    const deltaPercentage = (deltaY / windowHeight) * 100;

    // Inverted
    const newHeight = dragStartSheetHeight - deltaPercentage;

    if (newHeight > 25 && newHeight < 85) {
      setSheetHeight(newHeight);
    }
  };

  const handleSheetDragEnd = () => {
    setIsDraggingSheet(false);
    // Snap logic - more responsive thresholds
    if (sheetHeight > 55) setSheetHeight(80);
    else if (sheetHeight > 30) setSheetHeight(40);
    else setSheetHeight(25);
  };

  return (
    <div
      className="h-screen flex flex-col bg-slate-50 overflow-hidden relative select-none"
      onMouseMove={handleSheetDragMove}
      onMouseUp={handleSheetDragEnd}
      onTouchMove={handleSheetDragMove}
      onTouchEnd={handleSheetDragEnd}
    >
      {/* Fullscreen Map Background */}
      <div
        className="absolute inset-0 z-0 bg-slate-100 overflow-hidden"
        onMouseDown={e => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={e => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div className="w-full h-full">
          <MapVisualization
            mapOffset={mapOffset}
            scale={scale}
            isDragging={isDragging}
          />
        </div>

        {/* Map Overlay Controls */}
        <div className="absolute top-safe left-4 right-4 z-10 flex justify-between items-start pointer-events-none pt-4">
          <button onClick={() => onNavigate('scenario-b')} className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 pointer-events-auto active:scale-95 transition-transform text-slate-700">
            <span className="sr-only">Back</span>
            <X width={24} height={24} />
          </button>
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-100 pointer-events-auto">
            <h2 className="text-sm font-bold text-slate-900">Terminal 1 Map</h2>
          </div>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* LIVE DATA Indicator - Repositioned to Top Left under header area */}
        <div className="absolute top-16 left-4 bg-red-50/90 backdrop-blur-md px-3 py-1 rounded-full border border-red-100 flex items-center gap-2 pointer-events-none z-10 shadow-sm animate-fade-in">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] text-red-600 font-bold tracking-wide uppercase">LIVE DATA</span>
        </div>
      </div>

      {/* Bottom Sheet - Smart Route */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col justify-end pointer-events-none transition-[height] duration-75 ease-out"
        style={{ height: `${sheetHeight}%` }}
      >
        {/* Sheet Content */}
        <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] w-full h-full pointer-events-auto pb-safe animate-slide-up-fast border-t border-slate-100/50 flex flex-col">

          {/* Drag Handle */}
          <div
            className="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing hover:bg-slate-50 transition-colors rounded-t-3xl shrink-0"
            onMouseDown={handleSheetDragStart}
            onTouchStart={handleSheetDragStart}
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
          </div>

          <div className="px-6 pt-2 pb-24 md:pb-6 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Compass size={14} className="text-emerald-600" />
                  </div>
                  <h3 className="text-emerald-700 font-bold text-lg">Smart Route Found</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium">Security ➔ Baggage ➔ Food Court ➔ Check-in</p>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold text-emerald-600 tracking-tight">15m</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Saved</span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2.5 text-[16px] active:scale-[0.98] mb-6">
              <Footprints size={20} className="stroke-[2.5]" />
              Start Navigation
            </button>

            {/* Detailed Directions Preview */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Head to Security Checkpoint</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Then proceed to Baggage Claim Area</p>
                </div>
              </div>
              {/* Additional Directions for Expanded State */}
              <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 opacity-50">
                <div className="mt-1 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Food Court ➔ Check-in</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Final destination: Check-in Counters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
