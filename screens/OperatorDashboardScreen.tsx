import React, { useState } from 'react';
import { ScreenId } from '../types';
import { LogOut, AlertTriangle, Users, Activity, Eye, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

const OperatorDashboardScreen: React.FC<Props> = ({ onNavigate }) => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'High volume predicted at Domestic Security (+20m)', location: 'Checkpoint A', status: 'pending' },
    { id: 2, type: 'warning', message: 'Gate 5 boarding queue exceeding capacity', location: 'Gate 5', status: 'pending' },
  ]);

  const [systemStatus, setSystemStatus] = useState<'nominal' | 'alert'>('nominal');

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const toggleSystemStatus = () => {
    setSystemStatus(prev => prev === 'nominal' ? 'alert' : 'nominal');
  };

  return (
    <div className="flex flex-col h-full min-h-full">

      {/* Sticky Header - Adapts to container width */}
      <header className="sticky top-0 z-30 flex justify-between items-center px-4 py-4 pt-safe border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shrink-0">
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center gap-2">
            <Activity size={20} className="text-blue-400" />
            AOCC Command Center
          </h1>
          <div
            onClick={toggleSystemStatus}
            className="flex items-center gap-2 text-xs text-slate-400 mt-1 cursor-pointer hover:text-white transition-colors"
            title="Click to toggle status for demo"
          >
            <span className="flex items-center gap-1"><Clock size={10} /> 09:42 AM</span>
            <span className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'nominal' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></span>
            <span className={`font-medium ${systemStatus === 'nominal' ? 'text-emerald-400' : 'text-red-400'}`}>
              {systemStatus === 'nominal' ? 'System Nominal' : 'Active Incidents'}
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-slate-400 hover:text-white flex items-center gap-2 group"
        >
          <span className="text-xs font-medium hidden sm:block group-hover:text-white">Logout</span>
          <LogOut size={16} />
        </button>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 animate-slide-up">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="glass-card p-3 md:p-4 rounded-xl border-l-2 border-blue-500 bg-gradient-to-br from-blue-500/5 to-transparent">
            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider mb-1">Total Pax (1hr)</p>
            <p className="text-2xl md:text-3xl font-bold text-white">2,450</p>
            <p className="text-[10px] md:text-xs text-emerald-400 flex items-center gap-1">
              <span className="text-xs">↑</span> 12% vs avg
            </p>
          </div>
          <div className={`glass-card p-3 md:p-4 rounded-xl border-l-2 ${systemStatus === 'nominal' ? 'border-emerald-500' : 'border-red-500'} bg-gradient-to-br from-orange-500/5 to-transparent`}>
            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider mb-1">Avg Wait Time</p>
            <p className={`text-2xl md:text-3xl font-bold ${systemStatus === 'nominal' ? 'text-white' : 'text-red-400'}`}>
              {systemStatus === 'nominal' ? '12m' : '35m'}
            </p>
            <p className={`text-[10px] md:text-xs ${systemStatus === 'nominal' ? 'text-slate-500' : 'text-red-400'}`}>Security Check A</p>
          </div>
        </div>

        {/* SECTION 1: PREDICTIVE HEATMAP (God View) */}
        <section className="glass-card rounded-2xl border border-white/10 overflow-hidden relative group">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
            <h2 className="font-semibold text-white flex items-center gap-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Terminal Heatmap (Live)
            </h2>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">Floor 1</span>
          </div>

          <div className="relative h-64 md:h-80 lg:h-96 bg-slate-900 w-full overflow-hidden">
            {/* Base Floor Plan Grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            {/* Structures */}
            <div className="absolute top-8 left-8 w-24 h-40 md:w-32 md:h-52 border-2 border-slate-700 bg-slate-800/50 rounded-lg"></div> {/* Check-in */}
            <div className="absolute top-8 right-8 w-24 h-40 md:w-32 md:h-52 border-2 border-slate-700 bg-slate-800/50 rounded-lg"></div> {/* Security */}

            {/* Heatmap Overlays */}
            <div className={`absolute top-12 right-12 w-20 h-20 md:w-32 md:h-32 rounded-full blur-2xl animate-pulse transition-colors duration-1000 ${systemStatus === 'nominal' ? 'bg-emerald-500/20' : 'bg-red-500/40'}`}></div>
            <div className="absolute top-16 left-12 w-16 h-16 md:w-24 md:h-24 bg-yellow-500/20 rounded-full blur-xl"></div>

            {/* Labels */}
            {systemStatus === 'alert' && (
              <div className="absolute top-48 right-12 text-[10px] font-bold text-red-400 bg-slate-950/80 px-2 py-1 rounded border border-red-500/30 animate-bounce">
                ⚠️ Congestion Detected
              </div>
            )}
            <div className="absolute top-48 left-12 text-[10px] font-bold text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-white/10">
              Check-in Area B
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* SECTION 2: LIVE ALERTS FEED */}
          <section>
            <div className="flex justify-between items-end mb-3 px-1">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Predictive Alerts</h2>
              <span className="text-[10px] text-slate-500">Auto-refresh: ON</span>
            </div>

            <div className="space-y-3">
              {systemStatus === 'alert' && !alerts.find(a => a.id === 99) && (
                <div className="glass-card p-4 rounded-xl border-l-4 border-red-500 bg-red-500/5 animate-slide-up">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={16} className="text-red-500 animate-pulse" />
                      <span className="font-semibold text-sm text-red-200">System Alert</span>
                    </div>
                    <span className="text-[10px] text-red-300/70">Just now</span>
                  </div>
                  <p className="text-sm text-red-100 mb-3 font-medium">Critical capacity threshold reached at Security B.</p>
                  <button className="w-full bg-red-600 hover:bg-red-500 text-white text-xs py-2 rounded-lg transition-colors shadow-lg shadow-red-900/20 font-bold">
                    INITIATE CROWD CONTROL PROTOCOL
                  </button>
                </div>
              )}

              {alerts.map(alert => (
                <div key={alert.id} className={`glass-card p-4 rounded-xl border-l-4 transition-all duration-300 ${alert.status === 'resolved' ? 'border-emerald-500 opacity-60 bg-slate-900/50' : alert.type === 'critical' ? 'border-red-500 bg-slate-800/50' : 'border-orange-500 bg-slate-800/50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {alert.status === 'resolved' ? <CheckCircle size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-500' : 'text-orange-500'} />}
                      <span className={`font-semibold text-sm ${alert.status === 'resolved' ? 'text-slate-400' : 'text-white'}`}>{alert.location}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">2m ago</span>
                  </div>
                  <p className={`text-sm mb-3 ${alert.status === 'resolved' ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{alert.message}</p>

                  {alert.status !== 'resolved' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs py-2 rounded-lg transition-colors border border-white/5 font-medium"
                      >
                        Ignore
                      </button>
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20 font-medium"
                      >
                        Deploy Staff
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: CCTV AI MONITORING */}
          <section>
            <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider px-1">AI Vision Feeds</h2>
            <div className="grid grid-cols-2 gap-3 lg:gap-6">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={24} className="text-slate-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md">CAM 04: Check-in</div>
                <div className={`absolute top-2 right-2 text-[10px] font-mono px-1 rounded border ${systemStatus === 'nominal' ? 'text-emerald-400 bg-emerald-950/80 border-emerald-500/30' : 'text-red-400 bg-red-950/80 border-red-500/30'}`}>
                  {systemStatus === 'nominal' ? 'DENSITY: MED' : 'DENSITY: HIGH'}
                </div>
                <div className={`absolute top-1/2 left-1/2 w-8 h-12 border -translate-x-1/2 -translate-y-1/2 transition-colors ${systemStatus === 'nominal' ? 'border-emerald-500/50' : 'border-red-500/80'}`}></div>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={24} className="text-slate-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md">CAM 08: Security</div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-blue-400 bg-blue-950/80 px-1 rounded border border-blue-500/30">
                  FLOW: SMOOTH
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default OperatorDashboardScreen;