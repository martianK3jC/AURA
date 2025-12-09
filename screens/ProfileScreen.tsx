import React from 'react';
import { ScreenId } from '../types';

interface Props {
   onNavigate: (screen: ScreenId) => void;
}

const ProfileScreen: React.FC<Props> = ({ onNavigate }) => {
   return (
      <div className="flex flex-col h-full">
         {/* Header */}
         <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border-b border-white/10 p-8 pt-safe rounded-b-[2.5rem] relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)] text-4xl mb-4 border-4 border-slate-950 text-white">👤</div>
               <h2 className="text-2xl font-bold text-white">Traveler</h2>
               <p className="text-slate-400 text-sm mb-2">traveler@aura.app</p>
               <span className="bg-violet-500/20 text-violet-300 px-4 py-1 rounded-full text-xs border border-violet-500/30 font-medium">✨ AURA Member</span>
            </div>
         </div>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-6 pb-6">
            <div className="grid grid-cols-3 gap-3 mb-8">
               <div className="glass-card rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-400">12</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Trips</div>
               </div>
               <div className="glass-card rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-cyan-400">3.5h</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Saved</div>
               </div>
               <div className="glass-card rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-orange-400">🔥 8</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Streak</div>
               </div>
            </div>

            {/* History */}
            <h3 className="text-slate-400 text-sm font-semibold mb-3 pl-1">Recent Flights</h3>
            <div className="space-y-3 mb-8">
               <div className="glass-card p-4 rounded-xl flex justify-between items-center">
                  <div>
                     <p className="font-semibold text-white">PR 123 • MNL-NRT</p>
                     <p className="text-xs text-slate-500">Dec 6, 2025</p>
                  </div>
                  <div className="text-right">
                     <span className="block text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full mb-1 font-bold">✓ On Time</span>
                     <span className="text-[10px] text-emerald-400 font-medium">+15m saved</span>
                  </div>
               </div>
               <div className="glass-card p-4 rounded-xl flex justify-between items-center opacity-70">
                  <div>
                     <p className="font-semibold text-white">5J 567 • CEB-SIN</p>
                     <p className="text-xs text-slate-500">Nov 28, 2025</p>
                  </div>
                  <div className="text-right">
                     <span className="block text-[10px] text-slate-400 px-2 py-0.5 rounded-full mb-1 font-bold">✓ Completed</span>
                  </div>
               </div>
            </div>

            {/* Settings */}
            <h3 className="text-slate-400 text-sm font-semibold mb-3 pl-1">Preferences</h3>
            <div className="space-y-2">
               <div className="glass-card p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <span className="text-lg">🔔</span>
                     <span className="text-sm text-white">Push Notifications</span>
                  </div>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <div className="glass-card p-4 rounded-xl flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <span className="text-lg">✨</span>
                     <span className="text-sm text-white">Proactive Suggestions</span>
                  </div>
                  <div className="w-10 h-5 bg-violet-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
            </div>

            <button onClick={() => onNavigate('landing')} className="w-full mt-8 bg-red-500/10 border border-red-500/30 text-red-400 font-semibold py-3 rounded-xl hover:bg-red-500/20 transition-colors">
               Logout
            </button>
            {/* Mobile Nav Spacer */}
            <div className="h-20 md:hidden"></div>
         </div>
      </div>
   );
};

export default ProfileScreen;