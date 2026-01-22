import React, { useState } from 'react';
import { Sparkles, MessageSquare, AlertTriangle, PhoneCall, LogOut, User, Home, Car, CheckSquare, ShieldCheck, DoorOpen, Plane, CheckCircle, MapPin, CloudSun, ArrowRight } from 'lucide-react';
import Toast from '../components/Toast';
import TimelineCard from '../components/TimelineCard';
import GlassCard from '../components/GlassCard';
import FlightDetailsModal from '../components/FlightDetailsModal'; // NEW
import { ScreenId, ScenarioData, TravelerContext } from '../types';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  travelerContext?: TravelerContext;
}

const DashboardScreen: React.FC<Props> = ({ onNavigate, onLogout, travelerContext }) => {
  const isStress = false; // Always relaxed scenario (Scenario B removed)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null); // For bento box details

  // Bottom Sheet Logic for Dashboard
  const [sheetHeight, setSheetHeight] = useState(12); // Percentage: Default to minimum (collapsed)
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartHeight, setDragStartHeight] = useState(0);

  const handleSheetDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDraggingSheet(true);
    // clientY is either in touches[0] or directly on the event for mouse
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setDragStartHeight(sheetHeight);
  };

  const handleSheetDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingSheet) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;
    const windowHeight = window.innerHeight;
    const deltaPercentage = (deltaY / windowHeight) * 100;

    // Inverted because dragging down (positive deltaY) decreases height (bottom based)
    const newHeight = dragStartHeight - deltaPercentage;

    // Clamp between 12% and 92%
    if (newHeight > 12 && newHeight < 92) {
      setSheetHeight(newHeight);
    }
  };

  const handleSheetDragEnd = () => {
    setIsDraggingSheet(false);
    // Snap logic
    if (sheetHeight > 75) setSheetHeight(90);
    else if (sheetHeight > 40) setSheetHeight(58); // Default rest
    else setSheetHeight(12); // Collapsed
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Extract user info from context
  const userName = travelerContext?.userName || 'Traveler';
  const flightNumber = travelerContext?.flightNumber || 'PR 123';
  const isGuest = travelerContext?.isGuest || false;

  const data: ScenarioData = isStress ? {
    id: 'B',
    flightStatus: 'delayed',
    totalTime: '2h 10m',
    steps: [
      { id: '1', icon: 'home', title: 'Home - Lahug', status: 'completed', time: 'Departed 10m ago' },
      {
        id: '2',
        icon: 'car',
        title: 'Travel to MCIA',
        status: 'critical',
        time: '1h 15m',
        badge: '🔴 Accident',
        badgeColor: 'red',
        description: 'Fernan Bridge closure',
        isCurrent: true // User is stuck in traffic
      },
      // Inserted AI Card will be handled in map loop
      {
        id: '3',
        icon: 'bag',
        title: 'Security Checkpoint',
        status: 'warning',
        time: '35 mins',
        badge: 'High Density',
        badgeColor: 'orange',
        subtext: 'Queue Time • Cam 04'
      },
      { id: '4', icon: 'shield', title: 'Security Check', status: 'upcoming', subtext: 'Calculating...' },
    ]
  } : {
    id: 'A',
    flightStatus: 'ontime',
    totalTime: '3h 45m',
    steps: [
      { id: '1', icon: 'home', title: 'Home - Lahug', status: 'completed', time: 'Departed 4h ago' },
      { id: '2', icon: 'car', title: 'Arrived at MCIA', status: 'completed', time: 'Arrived 3h ago' },
      { id: '3', icon: 'passport', title: 'Check-In Complete', status: 'completed', time: '2h 50m ago' },
      { id: '4', icon: 'shield', title: 'Security Cleared', status: 'completed', time: 'Just now', isCurrent: true },
      { id: '5', icon: 'plane', title: 'Relax & Wait', status: 'upcoming', time: 'Boarding in 3h 45m' },
    ]
  };

  return (
    <div
      className="flex flex-col h-full relative select-none"
      onMouseMove={handleSheetDragMove}
      onTouchMove={handleSheetDragMove}
      onMouseUp={handleSheetDragEnd}
      onTouchEnd={handleSheetDragEnd}
      onMouseLeave={handleSheetDragEnd}
    >

      {/* Personalized Greeting Header */}
      {travelerContext && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 px-6 py-4 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User size={16} className="text-red-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Welcome back, {userName}!
                </span>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="hidden md:flex bg-white/60 backdrop-blur-md border border-white/50 rounded-xl px-3 py-2 items-center gap-3 shadow-sm">
              <CloudSun size={24} className="text-orange-500" />
              <div className="leading-none">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">Cebu</span>
                <span className="block text-sm font-bold text-stone-800">32°C</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Content Container - Top Section */}
      <div className="relative z-10 px-6 pt-4 pb-4">
        <div className="max-w-md mx-auto w-full space-y-3">

          {/* BOXED CARD: Tight Schedule / Timer */}
          <GlassCard className={`p-6 rounded-3xl text-center relative overflow-hidden transition-all duration-500 transform ${isStress ? 'border-red-200 bg-white shadow-xl shadow-red-500/10' : 'border-emerald-200 bg-white shadow-lg'}`}>
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${isStress ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}></div>

            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isStress ? 'text-red-500' : 'text-emerald-600'}`}>
                {isStress ? '⚠ Tight Schedule' : '✨ Relaxed Schedule'}
              </span>
            </div>

            <h2 className={`text-6xl font-black tracking-tighter mb-1 mt-2 bg-clip-text text-transparent bg-gradient-to-b ${isStress ? 'from-red-600 to-orange-600' : 'from-emerald-600 to-teal-600'}`}>
              {data.totalTime}
            </h2>
            <p className="text-sm font-medium text-stone-500">{isStress ? 'to Gate Closing' : 'until boarding'}</p>
          </GlassCard>

          {/* BENTO BOX: Opportunities (Only Scenario A - Relaxed) */}
          {/* BENTO BOX: AURA Recommendations */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-2 px-1">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest">AURA Recommendations</h3>
              <span className="text-[10px] font-bold bg-white text-stone-500 px-2.5 py-1 rounded-full border border-stone-200 whitespace-nowrap">+40m Available</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'lounge', icon: '☕', color: 'bg-rose-50 text-rose-600', title: 'PAGSS Lounge', desc: 'Relax nearby' },
                { id: 'food', icon: '🍽️', color: 'bg-orange-50 text-orange-600', title: 'Quick Meal', desc: 'Jollibee nearby' },
                { id: 'tasks', icon: '✅', color: 'bg-blue-50 text-blue-600', title: 'Tasks', desc: 'Clear inbox' },
                { id: 'shop', icon: '🛍️', color: 'bg-purple-50 text-purple-600', title: 'Shopping', desc: 'Duty Free' },
              ].map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedOpportunity(item)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 hover:scale-105 shadow-sm border border-stone-100 ${item.color} bg-white`}
                >
                  <span className="text-lg filter drop-shadow-sm">{item.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Smart Boarding Pass / Flight Card - Moved outside bottom sheet */}
          <GlassCard
            className="rounded-2xl p-0 overflow-hidden border-0 shadow-lg relative group cursor-pointer transition-transform hover:scale-[1.01] ring-1 ring-stone-100 animate-slide-up"
            variant={isStress ? 'error' : 'success'}
            onClick={() => setShowFlightModal(true)}
            style={{ animationDelay: isStress ? '200ms' : '100ms' }}
          >
            {/* Top Section: Flight Info */}
            <div className={`p-5 ${isStress ? 'bg-red-50/50' : 'bg-emerald-50/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-neutral-900 tracking-tight">{flightNumber}</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-500 flex items-center gap-1">
                    Cebu (MCIA) <ArrowRight size={14} /> Narita (NRT)
                  </span>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${isStress ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                  {isStress ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                  {isStress ? 'Delayed (+45m)' : 'On Time'}
                </span>
              </div>

              {/* Flight Details Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-neutral-200/50 pt-4">
                <div className="text-center md:text-left">
                  <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-0.5">Terminal</p>
                  <p className="text-lg font-bold text-neutral-800">2</p>
                </div>
                <div className="text-center md:text-left relative">
                  <div className="flex items-center gap-1.5 justify-center md:justify-start mb-0.5">
                    <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Gate</p>
                    {isStress && <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">CHANGED</span>}
                  </div>
                  <p className={`text-lg font-bold ${isStress ? 'text-red-600' : 'text-neutral-800'}`}>
                    {isStress ? '12A' : '05'}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider mb-0.5">Boarding</p>
                  <p className="text-lg font-bold text-neutral-800">
                    {isStress ? '14:45' : '13:30'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: AURA Insight */}

          </GlassCard>
        </div>
      </div>

      {/* BOTTOM SHEET: Routes & Flight Info */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col pointer-events-none transition-[height] duration-75 ease-out"
        style={{ height: `${sheetHeight}%` }}
      >
        <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] w-full h-full pointer-events-auto flex flex-col animate-slide-up border-t border-stone-100">

          {/* Drag Handle */}
          <div
            className="w-full flex justify-center pt-4 pb-2 shrink-0 cursor-grab active:cursor-grabbing hover:bg-stone-50 transition-colors rounded-t-[2.5rem]"
            onMouseDown={handleSheetDragStart}
            onTouchStart={handleSheetDragStart}
          >
            <div className="w-12 h-1.5 bg-stone-200 rounded-full"></div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">

            {/* Unified Journey Timeline (Arrival Style) */}
            <div className="relative pl-1">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">Your Journey</h3>
              <div className="space-y-4">
                {data.steps.map((step, index) => {
                  // Icon Mapping
                  const getStepIcon = (iconName: string) => {
                    switch (iconName) {
                      case 'home': return Home;
                      case 'car': return Car;
                      case 'bag': return CheckSquare;
                      case 'shield': return ShieldCheck;
                      case 'passport': return DoorOpen; // Immigration/Gate
                      case 'door': return Plane;
                      default: return MapPin;
                    }
                  };
                  const Icon = getStepIcon(step.icon);

                  // Status Logic
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.isCurrent;
                  const isCritical = step.status === 'critical';
                  const isWarning = step.status === 'warning';

                  // Status Colors
                  const getStatusColor = () => {
                    if (isCritical) return 'border-red-500 bg-red-50 text-red-600';
                    if (isWarning) return 'border-orange-500 bg-orange-50 text-orange-600';
                    if (isCurrent) return 'border-red-600 bg-red-100 text-red-700'; // Active Red
                    if (isCompleted) return 'border-emerald-500 bg-emerald-50 text-emerald-600';
                    return 'border-neutral-200 bg-white text-neutral-400';
                  };

                  return (
                    <React.Fragment key={step.id}>
                      {/* Special AI Recommendation Card (Scenario B) */}
                      {isStress && index === 2 && (
                        <div className="relative pl-0 md:pl-0 mb-8 animate-slide-up">
                          {/* Connector Line through the recommendation */}
                          <div className="absolute left-[27px] -top-10 -bottom-10 w-[3px] bg-red-200 -z-10"></div>

                          <div className="bg-[#FFF8F0] border border-orange-200 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
                            {/* Left Accent Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>

                            <div className="relative z-10 pl-2">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                  <Sparkles size={16} className="text-orange-600" />
                                </div>
                                <h3 className="text-orange-900 font-bold text-lg">AURA Recommendation</h3>
                              </div>

                              <div className="space-y-3">
                                <p className="text-stone-800 font-medium text-sm">⚠️ High congestion detected at Security Checkpoint</p>

                                <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                                  <p className="font-bold text-stone-900 text-xs uppercase tracking-wide mb-1 text-opacity-60">Alternative Available</p>
                                  <p className="text-sm text-stone-700 font-semibold">→ Go to Security Checkpoint 2 <span className="text-emerald-600 font-bold">(Clear)</span></p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                                    <span className="animate-pulse">⏱️</span> Time Saved: 15 minutes
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => onNavigate('map')}
                                className="mt-4 w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 hover:shadow-orange-500/30 transition-all active:scale-[0.98]"
                              >
                                <MapPin size={18} />
                                View Map
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Standard Step Card */}
                      <div
                        className="relative animate-slide-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Connector Line */}
                        {index < data.steps.length - 1 && (
                          <div className={`absolute left-[27px] top-16 bottom-[-16px] w-[3px] rounded-full -z-10 ${isCompleted ? 'bg-emerald-500' :
                            isCritical ? 'bg-red-200' : 'bg-neutral-100'
                            } transition-colors duration-500`}></div>
                        )}

                        <GlassCard className={`p-0 overflow-hidden transition-all duration-300 ${isCurrent ? 'ring-2 ring-red-500 ring-offset-2 shadow-lg scale-[1.01]' : 'hover:shadow-md'
                          } ${isCritical ? 'border-red-500 bg-red-50' : 'border-neutral-200'}`}>

                          <div className={`p-4 flex items-start gap-3 ${isCritical ? 'bg-red-50' : ''}`}>
                            {/* Icon Circle */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full border-[3px] flex items-center justify-center z-10 relative bg-white transition-all duration-300 ${getStatusColor()}`}>
                              {isCompleted ? (
                                <CheckCircle size={20} />
                              ) : (
                                <Icon size={20} />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-bold text-base leading-tight ${isCritical ? 'text-red-700' : isCurrent ? 'text-neutral-900' : 'text-neutral-900'}`}>
                                    {step.title}
                                  </h3>
                                  {step.description && (
                                    <p className={`text-xs mt-0.5 font-medium ${isCritical ? 'text-red-600/80' : 'text-neutral-500'}`}>{step.description}</p>
                                  )}
                                </div>
                                {step.time && (
                                  <div className="text-right flex-shrink-0">
                                    <span className={`block font-bold text-sm whitespace-nowrap ${isCritical ? 'text-red-700' :
                                      isCompleted ? 'text-emerald-600' :
                                        'text-neutral-900'
                                      }`}>
                                      {step.time}
                                    </span>
                                    {step.badge && (
                                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${step.badge === '🔴 Accident' ? 'bg-red-200 text-red-800' :
                                        step.badgeColor === 'red' ? 'bg-red-100 text-red-700' :
                                          'bg-neutral-100 text-neutral-600'
                                        }`}>
                                        {step.badge.replace('🔴 ', '')}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* "YOU ARE HERE" Indicator */}
                              {isCurrent && (
                                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 animate-pulse uppercase tracking-wider">
                                  <MapPin size={14} className="fill-red-600" />
                                  <span>You are here</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal for Bento Box Selection */}
      {selectedOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6" onClick={() => setSelectedOpportunity(null)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 text-center relative" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 mx-auto bg-stone-50 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm border border-stone-100">
              {selectedOpportunity.icon}
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">{selectedOpportunity.title}</h3>
            <p className="text-stone-500 mb-6">{selectedOpportunity.desc}</p>
            <button
              onClick={() => {
                showToast(`${selectedOpportunity.title} selected!`, "success");
                setSelectedOpportunity(null);
              }}
              className="w-full bg-stone-900 text-white font-bold py-3.5 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Go Here
            </button>
          </div>
        </div>
      )}

      {/* Flight Details Modal - NEW */}
      <FlightDetailsModal
        isOpen={showFlightModal}
        onClose={() => setShowFlightModal(false)}
        flightNumber={flightNumber}
        isDelayed={isStress}
        travelerContext={travelerContext}
      />
    </div >
  );
};

export default DashboardScreen;