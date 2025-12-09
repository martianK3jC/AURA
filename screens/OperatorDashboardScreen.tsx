import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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

  const [expandedCam, setExpandedCam] = useState<number | null>(null);

  const handleResolve = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const toggleSystemStatus = () => {
    setSystemStatus(prev => prev === 'nominal' ? 'alert' : 'nominal');
  };

  return (
    <div className="flex flex-col h-full min-h-full relative">

      {/* CCTV EXPANSION MODAL OVERLAY - PORTAL TO BODY */}
      {expandedCam !== null && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-200"
          onClick={() => setExpandedCam(null)}
        >
          <div className="w-full max-w-6xl aspect-video bg-slate-900 rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Fake Video Feed Content */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
              <Users size={64} className="text-slate-700 animate-pulse" />
              {/* Scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
            </div>

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/90 to-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-white font-bold text-lg md:text-3xl flex items-center gap-2 md:gap-3">
                  <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                  <span className="drop-shadow-md text-sm sm:text-lg md:text-3xl max-w-[200px] md:max-w-none leading-tight">{expandedCam === 1 ? 'CAM 04: Check-in Area' : 'CAM 08: Security Checkpoint'}</span>
                </h2>
                <p className="text-slate-300 text-xs md:text-base font-mono mt-1 md:mt-2 bg-black/40 inline-block px-2 py-1 rounded border border-white/10">
                  {expandedCam === 1
                    ? (systemStatus === 'nominal' ? 'DENSITY: MED' : 'DENSITY: HIGH')
                    : 'FLOW: SMOOTH'}
                </p>
              </div>
              <button
                onClick={() => setExpandedCam(null)}
                className="absolute top-4 right-4 md:static px-3 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all border border-white/10 hover:border-white/30 flex items-center gap-2 backdrop-blur-md"
              >
                <span className="md:hidden"><LogOut size={16} /></span>
                <span className="hidden md:inline">Close View</span>
              </button>
            </div>

            {/* AI Bounding Box Simulation */}
            <div className={`absolute top-1/2 left-1/2 w-[35%] h-[40%] md:w-48 md:h-72 border md:border-2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 ${expandedCam === 1 && systemStatus === 'alert' ? 'border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]'}`}>
              <div className={`absolute -top-6 md:-top-8 left-0 text-white text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded backdrop-blur-md ${expandedCam === 1 && systemStatus === 'alert' ? 'bg-red-600/80' : 'bg-emerald-600/80'}`}>
                {expandedCam === 1 && systemStatus === 'alert' ? 'CROWD DENSITY: CRITICAL' : 'SUBJECT: 98%'}
              </div>
              {/* Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-white/50 -mt-0.5 -ml-0.5 md:-mt-1 md:-ml-1"></div>
              <div className="absolute top-0 right-0 w-2 h-2 md:w-4 md:h-4 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-white/50 -mt-0.5 -mr-0.5 md:-mt-1 md:-mr-1"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-white/50 -mb-0.5 -ml-0.5 md:-mb-1 md:-ml-1"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 md:w-4 md:h-4 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-white/50 -mb-0.5 -mr-0.5 md:-mb-1 md:-mr-1"></div>
            </div>
          </div>
          <p className="text-slate-400 mt-6 text-sm font-medium tracking-wide">Click anywhere outside to close</p>
        </div>,
        document.body
      )}

      {/* Sticky Header - Adapts to container width */}
      <header className="sticky top-0 z-30 flex justify-between items-center pl-16 pr-4 md:px-4 py-4 pt-safe border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center gap-2">
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

      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-6 space-y-6 animate-slide-up">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
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

          <div className="relative h-64 md:h-80 lg:h-96 bg-slate-950 w-full overflow-hidden">
            {/* Base Floor Plan Grid */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>

            {/* Structures */}
            <div className="absolute top-8 left-8 w-24 h-40 md:w-32 md:h-52 border-2 border-slate-700 bg-slate-800/80 rounded-lg"></div> {/* Check-in */}
            <div className="absolute top-8 right-8 w-24 h-40 md:w-32 md:h-52 border-2 border-slate-700 bg-slate-800/80 rounded-lg"></div> {/* Security */}

            {/* Heatmap Overlays - INCREASED OPACITY & SIZE FOR BETTER VISIBILITY */}
            <div className={`absolute top-12 right-12 w-28 h-28 md:w-40 md:h-40 rounded-full blur-3xl animate-pulse transition-colors duration-1000 mix-blend-screen ${systemStatus === 'nominal' ? 'bg-emerald-500/30' : 'bg-red-500/60'}`}></div>
            <div className="absolute top-16 left-12 w-24 h-24 md:w-32 md:h-32 bg-orange-500/30 rounded-full blur-2xl mix-blend-screen px-4"></div>

            {/* Labels */}
            {systemStatus === 'alert' && (
              <div className="absolute top-48 right-12 text-[10px] font-bold text-red-100 bg-red-900/90 px-3 py-1.5 rounded border border-red-500/50 animate-bounce shadow-lg shadow-red-900/50">
                ⚠️ Congestion Detected
              </div>
            )}
            <div className="absolute top-48 left-12 text-[10px] font-bold text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-white/10">
              Check-in Area B
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          {/* SECTION 2: LIVE ALERTS FEED */}
          <section>
            <div className="flex justify-between items-end mb-3 px-1">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Predictive Alerts</h2>
              <span className="text[10px] text-slate-500">Auto-refresh: ON</span>
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

              {/* CAM 04 */}
              <div
                className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-white/10 group cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-[0.98]"
                onClick={() => setExpandedCam(1)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={32} className="text-slate-700 animate-pulse group-hover:text-slate-600 transition-colors" />
                  {/* Scanlines (Mini) */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md z-10">CAM 04: Check-in</div>
                <div className={`absolute top-2 right-2 text-[10px] font-mono px-1 rounded border z-10 ${systemStatus === 'nominal' ? 'text-emerald-400 bg-emerald-950/80 border-emerald-500/30' : 'text-red-400 bg-red-950/80 border-red-500/30'}`}>
                  {systemStatus === 'nominal' ? 'DENSITY: MED' : 'DENSITY: HIGH'}
                </div>
                <div className={`absolute top-1/2 left-1/2 w-8 h-12 border -translate-x-1/2 -translate-y-1/2 transition-colors z-10 ${systemStatus === 'nominal' ? 'border-emerald-500/50' : 'border-red-500/80'}`}></div>

                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                  <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </div>

              {/* CAM 08 */}
              <div
                className="relative rounded-xl overflow-hidden aspect-video bg-slate-950 border border-white/10 group cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all active:scale-[0.98]"
                onClick={() => setExpandedCam(2)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={32} className="text-slate-700 animate-pulse group-hover:text-slate-600 transition-colors" />
                  {/* Scanlines (Mini) */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>
                </div>
                <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-white flex items-center gap-1 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> REC
                </div>
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white shadow-black drop-shadow-md z-10">CAM 08: Security</div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-blue-400 bg-blue-950/80 px-1 rounded border border-blue-500/30 z-10">
                  FLOW: SMOOTH
                </div>
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                  <Eye size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
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