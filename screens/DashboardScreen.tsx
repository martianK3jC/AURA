import React, { useState } from 'react';
import { Sparkles, MessageSquare, AlertTriangle, PhoneCall, LogOut, User, Home, Car, CheckSquare, ShieldCheck, DoorOpen, Plane, CheckCircle, MapPin, CloudSun, ArrowRight } from 'lucide-react';
import Toast from '../components/Toast';
import TimelineCard from '../components/TimelineCard';
import GlassCard from '../components/GlassCard';
import { ScreenId, ScenarioData, TravelerContext } from '../types';

interface Props {
  scenarioType: 'A' | 'B';
  onNavigate: (screen: ScreenId) => void;
  onSetScenario: (type: 'A' | 'B') => void;
  onLogout: () => void;
  travelerContext?: TravelerContext;
}

const DashboardScreen: React.FC<Props> = ({ scenarioType, onNavigate, onSetScenario, onLogout, travelerContext }) => {
  const isStress = scenarioType === 'B';
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);

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
        title: 'Check-In Queue',
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
    totalTime: '1h 10m',
    steps: [
      { id: '1', icon: 'home', title: 'Home - Lahug', status: 'current', time: 'Depart Now', isCurrent: true },
      {
        id: '2',
        icon: 'car',
        title: 'Travel to MCIA',
        status: 'upcoming',
        time: '35 mins',
        badge: 'Light Traffic',
        badgeColor: 'emerald',
        subtext: 'Via Google Maps API'
      },
      {
        id: '3',
        icon: 'bag',
        title: 'Check-In Queue',
        status: 'upcoming',
        time: '10 mins',
        badge: 'Low Density',
        badgeColor: 'emerald',
        subtext: 'Queue Time • Cam 04'
      },
      {
        id: '4',
        icon: 'shield',
        title: 'Security Check',
        status: 'upcoming',
        time: '5 mins',
        subtext: 'Queue Time • Cam 08'
      },
      {
        id: '5',
        icon: 'door',
        title: 'Boarding Gate 5',
        status: 'upcoming',
        time: '5 mins',
        subtext: 'Walking Time • 80m Distance'
      },
    ]
  };

  return (
    <div className="flex flex-col h-full relative">

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
              <p className="text-xs text-gray-600">
                {isStress
                  ? 'Tight schedule detected. Follow AURA recommendations.'
                  : 'On time for check-in. Have a safe trip!'}
              </p>
            </div>

            {/* Weather Widget */}
            <div className="hidden md:flex bg-white/60 backdrop-blur-md border border-white/50 rounded-xl px-3 py-2 items-center gap-3 shadow-sm">
              <CloudSun size={24} className="text-orange-500" />
              <div className="leading-none">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider">Cebu</span>
                <span className="block text-sm font-bold text-stone-800">32°C</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Flight</p>
              <p className="text-sm font-bold text-red-600">{flightNumber}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header Info - RESTRUCTURED FOR HERO NUMBER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl px-10 md:px-16 py-6 pt-safe border-b border-neutral-200 shrink-0 transition-all shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${isStress ? 'text-red-500 animate-pulse' : 'text-emerald-600'}`}>
                {isStress ? '⚠ Tight Schedule' : 'Total Time to Gate'}
              </span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isStress ? 'from-red-600 to-orange-600' : 'from-emerald-600 to-teal-500'}`}>
              {data.totalTime}
            </h2>
          </div>

          <div className="flex gap-2">
            {/* Demo Toggles - Clean Modern */}
            <div className="bg-white border border-neutral-200 rounded-full p-1 flex gap-1 shadow-sm">
              <button aria-label="Switch to Scenario A" onClick={() => onSetScenario('A')} className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${!isStress ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'}`}>A</button>
              <button aria-label="Switch to Scenario B" onClick={() => onSetScenario('B')} className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${isStress ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900'}`}>B</button>
            </div>


          </div>
        </div>
      </div>

      {/* Scrollable Content Container with margins */}
      <div className="flex-1 overflow-y-auto px-10 md:px-16 py-8 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Critical Alert Banner (Only Scenario B) */}
          {isStress && (
            <div className="bg-gradient-to-r from-red-600 to-orange-600 animate-pulse p-4 rounded-2xl mb-4 shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-start gap-3 relative z-20">
              <span className="text-3xl animate-pulse">⚠️</span>
              <div>
                <h2 className="text-white font-bold text-xl leading-tight">CRITICAL DELAY DETECTED</h2>
                <p className="text-red-100 text-sm mt-1">Traffic accident reported on Fernan Bridge (+40 mins)</p>
              </div>
            </div>
          )}

          {/* Delay Opportunities (Only Scenario B) - Phase 3.3 */}
          {isStress && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-lg font-bold text-neutral-900">Delay Opportunities</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">+40 min available</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Lounge Access */}
                <GlassCard
                  onClick={() => showToast("☕ PAGSS Lounge added to your itinerary!", "success")}
                  className="p-4 rounded-xl border border-rose-200 bg-white shadow-md hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100/50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                      <span className="text-2xl drop-shadow-sm">☕</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1 group-hover:text-red-700 transition-colors">Visit PAGSS Lounge</h4>
                      <p className="text-xs text-neutral-500 mb-2 font-medium">Priority Pass accepted • 2nd Floor</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">25 min</span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-500">Relax before flight</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Dining Option */}
                <GlassCard
                  onClick={() => showToast("🍽️ Reminder set for 15 minutes prior!", "info")}
                  className="p-4 rounded-xl border border-rose-200 bg-white shadow-md hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100/50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                      <span className="text-2xl drop-shadow-sm">🍽️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1 group-hover:text-red-700 transition-colors">Grab a Meal</h4>
                      <p className="text-xs text-neutral-500 mb-2 font-medium">Nearest: Jollibee Pre-Departure</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">20 min</span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-500">Before security</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Last Minute Tasks */}
                <GlassCard
                  onClick={() => showToast("✅ Task list opened. Focus mode enabled.", "success")}
                  className="p-4 rounded-xl border border-rose-200 bg-white shadow-md hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100/50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                      <span className="text-2xl drop-shadow-sm">✅</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1 group-hover:text-red-700 transition-colors">Complete Tasks</h4>
                      <p className="text-xs text-neutral-500 mb-2 font-medium">Check emails, work items</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">30 min</span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-500">Use time wisely</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Duty Free Shopping */}
                <GlassCard
                  onClick={() => showToast("🛍️ Duty Free map location saved.", "success")}
                  className="p-4 rounded-xl border border-rose-200 bg-white shadow-md hover:shadow-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100/50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                      <span className="text-2xl drop-shadow-sm">🛍️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 mb-1 group-hover:text-red-700 transition-colors">Browse Duty Free</h4>
                      <p className="text-xs text-neutral-500 mb-2 font-medium">After security checkpoint</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">15 min</span>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-500">Get souvenirs</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Quick Tip */}
              <div className="mt-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-900 flex items-start gap-2">
                  <span className="text-base shrink-0">💡</span>
                  <span><strong>Pro Tip:</strong> AURA will notify you 15 minutes before you need to head to security. Relax and make the most of this unexpected time!</span>
                </p>
              </div>
            </div>
          )}

          {/* Smart Boarding Pass / Flight Card */}
          <GlassCard
            className="rounded-2xl p-0 overflow-hidden mb-6 border-0 shadow-lg relative group"
            variant={isStress ? 'error' : 'success'}
          >
            {/* Top Section: Flight Info */}
            <div className={`p-5 ${isStress ? 'bg-red-50/50' : 'bg-emerald-50/50'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-neutral-900 tracking-tight">{flightNumber}</span>
                    {isStress && <span className="animate-ping w-2 h-2 bg-red-500 rounded-full"></span>}
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

            {/* Bottom Section: AI Insight */}
            <div className={`px-5 py-3 flex items-center gap-3 ${isStress ? 'bg-red-100/50' : 'bg-emerald-100/50'}`}>
              <Sparkles size={16} className={isStress ? 'text-red-600' : 'text-emerald-600'} />
              <p className={`text-xs font-semibold ${isStress ? 'text-red-800' : 'text-emerald-800'} flex-1`}>
                {isStress
                  ? "GATE CHANGE: Proactively rerouted via Walkway B to avoid congestion."
                  : "Scanning AIDX: Boarding is on schedule. You have time for the lounge."}
              </p>
            </div>
          </GlassCard>

          {/* Unified Journey Timeline (Arrival Style) */}
          <div className="relative pl-1">
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
                      <div className="relative pl-0 md:pl-0 mb-6 animate-slide-up">
                        <div className="bg-gradient-to-br from-orange-50 via-yellow-50/50 to-red-50 backdrop-blur-xl border border-orange-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(234,88,12,0.1)] relative overflow-hidden group">
                          {/* Glow */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-transparent to-red-400/5 opacity-50"></div>

                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
                                <Sparkles size={20} className="text-orange-600" />
                              </div>
                              <h3 className="text-orange-900 font-bold text-lg">AURA Recommendation</h3>
                            </div>

                            <div className="space-y-3 pl-13">
                              <p className="text-stone-800 font-medium">High congestion detected at Terminal 1 Drop-off.</p>
                              <div className="bg-white/60 p-3 rounded-lg border border-orange-100/50">
                                <p className="font-bold text-stone-900 text-sm mb-1">Alternate Route Available:</p>
                                <p className="text-sm text-stone-600">→ Reroute to Terminal 2 Entrance (connected via walkway)</p>
                              </div>
                              <p className="text-emerald-700 font-bold flex items-center gap-2 text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                                <span>⏱️</span> Time Saved: 15 minutes
                              </p>
                            </div>

                            <button
                              onClick={() => onNavigate('scenario-c')}
                              className="mt-5 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all hover:shadow-orange-500/30"
                            >
                              View Alternate Entrance Map 🗺️
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
                        <div className={`absolute left-[27px] top-16 bottom-[-16px] w-[3px] rounded-full z-0 ${isCompleted ? 'bg-emerald-500/50' : 'bg-neutral-100'
                          } transition-colors duration-500`}></div>
                      )}

                      <GlassCard className={`p-5 transition-all duration-300 ${isCurrent ? 'ring-2 ring-red-500 ring-offset-2 shadow-lg scale-[1.01]' : 'hover:shadow-md'
                        } ${isCritical ? 'border-red-200 bg-red-50/30' : ''}`}>
                        <div className="flex items-start gap-5">
                          {/* Icon Circle */}
                          <div className={`flex-shrink-0 w-14 h-14 rounded-full border-[3px] flex items-center justify-center z-10 relative bg-white transition-all duration-300 ${getStatusColor()}`}>
                            {isCompleted ? (
                              <CheckCircle size={24} />
                            ) : (
                              <Icon size={24} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className={`font-bold text-lg leading-tight ${isCurrent || isCritical ? 'text-red-900' : 'text-neutral-900'}`}>
                                  {step.title}
                                </h3>
                                {step.description && (
                                  <p className="text-sm text-neutral-500 mt-1 font-medium">{step.description}</p>
                                )}
                              </div>
                              {step.time && (
                                <div className="text-right shrink-0">
                                  <span className={`block font-bold text-lg ${isCritical ? 'text-red-600' :
                                    isCompleted ? 'text-emerald-600' :
                                      'text-neutral-900'
                                    }`}>
                                    {step.time}
                                  </span>
                                  {step.badge && (
                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${step.badgeColor === 'red' ? 'bg-red-100 text-red-700' :
                                      'bg-neutral-100 text-neutral-600'
                                      }`}>
                                      {step.badge}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* "YOU ARE HERE" Indicator */}
                            {isCurrent && (
                              <div className="mt-3 flex items-center gap-2 text-sm font-bold text-red-700 animate-pulse">
                                <MapPin size={16} className="fill-red-600" />
                                <span>YOU ARE HERE</span>
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

        {/* Floating Chat Button (Bottom Right) */}
        <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
          <button
            onClick={() => onNavigate('chat')}
            className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-[0_8px_25px_rgba(234,88,12,0.5)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all text-3xl border-2 border-white/20"
            aria-label="Open AI Assistant and Emergency Help"
          >
            <MessageSquare size={24} aria-hidden="true" />
            {/* Unread badge */}
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
        </div>
      </div>
      {/* Toast Notification */}
      {
        toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )
      }
    </div >
  );
};

export default DashboardScreen;