import React from 'react';
import { Sparkles, MessageSquare, AlertTriangle } from 'lucide-react';
import TimelineCard from '../components/TimelineCard';
import { ScreenId, ScenarioData } from '../types';

interface Props {
  scenarioType: 'A' | 'B';
  onNavigate: (screen: ScreenId) => void;
  onSetScenario: (type: 'A' | 'B') => void;
}

const DashboardScreen: React.FC<Props> = ({ scenarioType, onNavigate, onSetScenario }) => {
  const isStress = scenarioType === 'B';

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

      {/* Sticky Header Info */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-xl px-6 py-4 pt-safe border-b border-white/5 shrink-0">
        <div className="flex justify-between items-start mt-2">
          <div>
            <p className="text-slate-400 text-sm">Good Morning, Traveler</p>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          </div>
          {/* Demo Toggles */}
          <div className="glass-card rounded-full p-1.5 flex gap-2">
            <button
              onClick={() => onSetScenario('A')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${!isStress ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => onSetScenario('B')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${isStress ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              B
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
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

        {/* Flight Card */}
        <div className={`glass-card rounded-2xl p-4 flex flex-col gap-2 mb-6 ${isStress ? 'border-red-500/50' : 'border-emerald-500/30'}`}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-lg font-semibold text-white block">PR 123</span>
              <span className="text-sm text-slate-300 block mt-1">
                Cebu (MCIA) <span className="text-slate-500">→</span> Narita (NRT)
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${isStress ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {isStress ? '⚠ Risk of Delay' : '✓ On Time'}
            </span>
          </div>

          {/* AI Insight (Scenario A) */}
          {!isStress && (
            <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-3 flex items-center gap-2 mt-1">
              <span className="text-lg">✨</span>
              <p className="text-violet-300 text-sm">AURA AI: Conditions are optimal. Enjoy the lounge!</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="relative pl-2 pb-6">

          {/* Timeline Gradient Line */}
          <div className={`absolute left-5 top-0 bottom-0 w-0.5 rounded-full z-0 ${isStress ? 'bg-gradient-to-b from-red-500 via-orange-500 to-slate-500' : 'bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-500'}`} />

          <div className="space-y-6 relative z-10">
            {data.steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Special rendering for AI Recommendation in Scenario B */}
                {isStress && index === 2 && (
                  <div className="flex items-start gap-4 pl-8 relative animate-slide-up">
                    {/* Timeline Node */}
                    <div className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center z-10 bg-slate-900 border-2 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <span className="text-lg">✨</span>
                    </div>

                    <div className="flex-1 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border-2 border-violet-500 rounded-2xl p-5 shadow-[0_0_30px_rgba(139,92,246,0.3)]">

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">✨</span>
                        <h3 className="text-violet-400 font-bold text-lg">AURA Recommendation</h3>
                      </div>

                      <div className="space-y-2 text-sm text-slate-200">
                        <p>High congestion detected at Terminal 1 Drop-off.</p>
                        <p className="font-medium text-white">Alternate Route Available:</p>
                        <p>→ Reroute to Terminal 2 Entrance (connected via walkway)</p>
                        <p className="text-emerald-400 font-semibold">⏱️ Time Saved: 15 minutes</p>
                      </div>

                      <button
                        onClick={() => onNavigate('scenario-c')}
                        className="mt-4 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        Update Route on Maps 🗺️
                      </button>
                    </div>
                  </div>
                )}

                <TimelineCard step={step} isLast={index === data.steps.length - 1} delay={index * 0.1} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Total Time Sticky Footer - Using sticky positioning within flex */}
      <div className="sticky bottom-0 z-20 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4 flex justify-between items-center mt-auto shrink-0">
        <div>
          <p className={`text-xs font-bold uppercase tracking-wider ${isStress ? 'text-orange-400 animate-pulse' : 'text-slate-400'}`}>
            {isStress ? '⚠ Tight Schedule' : 'Total Time to Gate'}
          </p>
          <p className={`text-3xl font-bold ${isStress ? 'text-orange-400' : 'text-emerald-400'}`}>{data.totalTime}</p>
        </div>
        {/* FAB */}
        <button
          onClick={() => onNavigate('chat')}
          className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center text-white hover:scale-105 transition-transform"
        >
          <MessageSquare size={20} />
        </button>
      </div>

    </div>
  );
};

export default DashboardScreen;