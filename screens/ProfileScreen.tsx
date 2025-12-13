import React, { useState } from 'react';
import { ScreenId, TravelerContext } from '../types';
import GlassCard from '../components/GlassCard';
import ConfirmationModal from '../components/ConfirmationModal';
import { User, Flame } from 'lucide-react';

interface Props {
   onNavigate: (screen: ScreenId) => void;
   travelerContext?: TravelerContext;
}

const ProfileScreen: React.FC<Props> = ({ onNavigate, travelerContext }) => {
   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

   // Extract user info
   const userName = travelerContext?.userName || 'Traveler';
   const userEmail = `${userName.toLowerCase().replace(/\s+/g, '.')}@aura.app`;

   return (
      <div className="flex flex-col h-full">
         <ConfirmationModal
            isOpen={showLogoutConfirm}
            title="Log Out"
            message="Are you sure you want to log out of your session? You will need to sign in again to access travel data."
            onConfirm={() => onNavigate('landing')}
            onCancel={() => setShowLogoutConfirm(false)}
            confirmText="Log Out"
            isDangerous={true}
         />
         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto pb-6">

            {/* Profile Card - Now Scrollable */}
            <div className="bg-gradient-to-br from-rose-800 to-red-900 rounded-b-[2.5rem] p-6 pt-safe mb-6 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 border-2 border-white/30 shadow-inner">
                     <User size={40} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-1 tracking-tight">{userName}</h2>
                  <p className="text-white/80 text-sm mb-3 font-medium">{userEmail}</p>
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full border border-yellow-200/50 shadow-lg">
                     ✨ AURA Member
                  </span>
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-10 md:px-16">
               <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm">
                     <div className="text-2xl font-bold text-red-600 mb-1">12</div>
                     <div className="text-xs text-neutral-600 uppercase tracking-wide font-medium">Trips</div>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm">
                     <div className="text-2xl font-bold text-emerald-600 mb-1">3.5h</div>
                     <div className="text-xs text-neutral-600 uppercase tracking-wide font-medium">Saved</div>
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center shadow-sm">
                     <div className="text-2xl font-bold text-amber-500 mb-1 flex items-center justify-center gap-1">
                        <Flame size={20} fill="currentColor" />
                        <span>8</span>
                     </div>
                     <div className="text-xs text-neutral-600 uppercase tracking-wide font-medium">Streak</div>
                  </div>
               </div>

               <div className="mb-6">
                  <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">Recent Flights</h3>
                  <div className="space-y-3">
                     <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="font-bold text-neutral-900">PR 123 • MNL-NRT</div>
                              <div className="text-xs text-neutral-500 mt-1">Dec 5, 2025</div>
                           </div>
                           <span className="bg-green-100 text-green-700 border border-green-300 text-xs font-bold px-2 py-1 rounded-full">✓ On Time</span>
                        </div>
                        <div className="text-xs text-green-600 font-medium">+15m saved</div>
                     </div>
                     <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm opacity-60">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="font-bold text-neutral-900">CEB 456 • CEB-MNL</div>
                              <div className="text-xs text-neutral-500 mt-1">Nov 28, 2025</div>
                           </div>
                           <span className="bg-neutral-100 text-neutral-600 text-xs font-medium px-2 py-1 rounded-full border border-neutral-300">✓ Completed</span>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Settings */}
               <h3 className="text-stone-500 text-sm font-semibold mb-3 pl-1">Preferences</h3>
               <div className="space-y-2">
                  <GlassCard className="p-4 rounded-xl flex justify-between items-center bg-white/80 border border-neutral-100">
                     <div className="flex items-center gap-3">
                        <span className="text-lg">🔔</span>
                        <span className="text-sm font-medium text-neutral-900">Push Notifications</span>
                     </div>
                     <div className="w-10 h-5 bg-red-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                  </GlassCard>
                  <GlassCard className="p-4 rounded-xl flex justify-between items-center bg-white/80 border border-neutral-100">
                     <div className="flex items-center gap-3">
                        <span className="text-lg">✨</span>
                        <span className="text-sm font-medium text-neutral-900">Proactive Suggestions</span>
                     </div>
                     <div className="w-10 h-5 bg-red-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                  </GlassCard>
               </div>

               <button onClick={() => setShowLogoutConfirm(true)} className="w-full mt-8 bg-red-50 border border-red-200 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors">
                  Logout
               </button>
               {/* Mobile Nav Spacer */}
               <div className="h-20 md:hidden"></div>
            </div>
         </div>
      </div>
   );
};

export default ProfileScreen;