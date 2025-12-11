import React from 'react';
import { TimelineStep } from '../types';
import GlassCard from './GlassCard';

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

  const getVariant = () => {
    if (step.status === 'critical') return 'critical';
    if (step.status === 'completed' || step.status === 'current') return 'highlight';
    return 'default';
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
      <GlassCard
        className={`flex-1 p-4 rounded-xl relative overflow-hidden transition-all duration-300 min-h-[100px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${step.isCurrent ? 'scale-[1.02] ring-2 ring-violet-500/50 ring-offset-2 ring-offset-slate-950' : ''
          }`}
        variant={getVariant()}
      >

        {/* "You Are Here" Indicator - Fixed positioning */}
        {step.isCurrent && (
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] z-30 animate-pulse flex items-center gap-1 border border-violet-400">
            <span className="text-xs">📍</span>
            <span className="hidden sm:inline">YOU ARE HERE</span>
            <span className="sm:hidden">HERE</span>
          </div>
        )}

        <div className="flex justify-between items-start relative z-10 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-sm sm:text-base truncate ${step.status === 'critical' ? 'text-white' :
              step.status === 'completed' ? 'text-slate-300' : 'text-white'
              }`}>
              {step.title}
            </h3>
            {step.time && (
              <p className={`text-lg sm:text-xl font-bold mt-1 ${step.status === 'critical' ? 'text-red-400' :
                step.status === 'warning' ? 'text-orange-400' :
                  step.status === 'current' || step.status === 'completed' ? 'text-emerald-400' :
                    'text-emerald-400'
                }`}>
                {step.time}
              </p>
            )}
          </div>
          {step.badge && (
            <span className={`px-2 py-1 rounded text-xs whitespace-nowrap flex-shrink-0 ${step.badgeColor === 'red' ? 'bg-red-500/20 text-red-400 animate-pulse' :
              step.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                'bg-emerald-500/10 text-emerald-400'
              }`}>
              {step.badge}
            </span>
          )}
        </div>

        {(step.subtext || step.description) && (
          <div className="mt-2 flex items-center gap-2 relative z-10">
            {step.status === 'warning' && <span className="w-2 h-2 bg-orange-500 rounded-full" />}
            <p className={`text-xs ${step.status === 'critical' ? 'text-red-300/80' : 'text-slate-500'}`}>
              {step.description || step.subtext}
            </p>
          </div>
        )}

        {/* Subtle background pulse for current step */}
        {step.isCurrent && (
          <div className="absolute inset-0 bg-violet-500/5 animate-pulse z-0 pointer-events-none"></div>
        )}
      </GlassCard>
    </div>
  );
};

export default TimelineCard;