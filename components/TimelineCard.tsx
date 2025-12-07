import React from 'react';
import { Home, Car, Briefcase, Shield, Ticket, DoorOpen, AlertTriangle } from 'lucide-react';
import { TimelineStep } from '../types';

interface TimelineCardProps {
  step: TimelineStep;
  isLast: boolean;
  delay?: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ step, isLast, delay = 0 }) => {
  const getIcon = () => {
    switch (step.icon) {
      case 'home': return '🏠';
      case 'car': return '🚗';
      case 'bag': return '🎒';
      case 'shield': return '🛡️';
      case 'passport': return '🛂';
      case 'door': return '🚪';
      default: return '📍';
    }
  };

  const getStatusStyles = () => {
    switch (step.status) {
      case 'current': return 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/10';
      case 'completed': return 'border-emerald-500/30 opacity-75';
      case 'critical': return 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      case 'warning': return 'border-orange-500/50';
      case 'upcoming': return 'border-white/5 opacity-60';
      default: return 'border-white/10';
    }
  };

  const getIconContainerStyles = () => {
    if (step.status === 'critical') return 'bg-slate-900 border-2 border-red-500';
    if (step.status === 'completed' || step.status === 'current') return 'bg-slate-800 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
    return 'bg-slate-900 border-2 border-slate-600';
  };

  return (
    <div 
      className="flex items-start gap-4 pl-8 relative animate-slide-up" 
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Icon Node */}
      <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 ${getIconContainerStyles()}`}>
        {getIcon()}
      </div>

      {/* Content Card */}
      <div className={`glass-card flex-1 p-4 rounded-xl ${getStatusStyles()}`}>
        <div className="flex justify-between items-start">
          <div>
             <h3 className={`font-medium ${step.status === 'critical' ? 'text-white' : step.status === 'completed' ? 'text-slate-300' : 'text-white'}`}>
                {step.title}
             </h3>
             {step.time && (
                <p className={`text-lg font-bold mt-1 ${
                    step.status === 'critical' ? 'text-red-400' : 
                    step.status === 'warning' ? 'text-orange-400' : 
                    step.status === 'current' || step.status === 'completed' ? 'text-emerald-400' : 
                    'text-emerald-400'
                }`}>
                    {step.time}
                </p>
             )}
          </div>
          {step.badge && (
             <span className={`px-2 py-1 rounded text-xs ${
                step.badgeColor === 'red' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                step.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                'bg-emerald-500/10 text-emerald-400'
             }`}>
                {step.badge}
             </span>
          )}
        </div>

        {(step.subtext || step.description) && (
            <div className="mt-2 flex items-center gap-2">
                {step.status === 'warning' && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
                <p className={`text-xs ${step.status === 'critical' ? 'text-red-300/80' : 'text-slate-500'}`}>
                    {step.description || step.subtext}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;