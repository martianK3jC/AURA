import React, { useState } from 'react';
import { ScreenId, TravelerContext } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';
import { User, Flame, ChevronRight, Sparkles, Bell, Zap, LogOut } from 'lucide-react';

interface Props {
    onNavigate: (screen: ScreenId) => void;
    travelerContext?: TravelerContext;
}

const ProfileScreen: React.FC<Props> = ({ onNavigate, travelerContext }) => {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [pushEnabled, setPushEnabled] = useState(true);
    const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);

    // Hardcoded user info to match screenshot
    const userName = 'gff';
    const userEmail = 'gff@aura.app';

    return (
        <div className="flex flex-col h-full bg-[#f2f2f7] relative text-neutral-900 font-sans">

            {/* Red Light Leak / Atmosphere at the top */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-red-500/10 via-red-500/5 to-transparent pointer-events-none" />

            <ConfirmationModal
                isOpen={showLogoutConfirm}
                title="Log Out"
                message="Are you sure you want to log out? You will need to sign in again to access your travel data."
                onConfirm={() => onNavigate('landing')}
                onCancel={() => setShowLogoutConfirm(false)}
                confirmText="Log Out"
                isDangerous={true}
            />

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-12 custom-scrollbar relative z-10">

                {/* Hero Profile Section */}
                <div className="pt-safe pt-14 pb-8 flex flex-col items-center justify-center text-center px-6">

                    {/* Avatar Container with Red Border */}
                    <div className="relative mb-5 group cursor-pointer">
                        <div className="w-[110px] h-[110px] rounded-full p-1 bg-white shadow-xl relative z-10 mx-auto border-[3px] border-red-600 group-hover:scale-105 transition-transform duration-300 ease-out">
                            <div className="w-full h-full rounded-full bg-neutral-100 overflow-hidden relative flex items-center justify-center">
                                <div className="bg-gradient-to-br from-neutral-50 to-neutral-200 w-full h-full flex items-center justify-center text-neutral-400">
                                    <User size={48} strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                        {/* Status Indicator */}
                        <div className="absolute bottom-1 right-1 z-20 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-neutral-100">
                            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></div>
                        </div>
                    </div>

                    {/* Typography */}
                    <h1 className="text-3xl font-bold tracking-tight mb-0.5">{userName}</h1>
                    <p className="text-neutral-500 font-medium text-[15px] mb-4">{userEmail}</p>

                    {/* Red Pill Badge - Premium Look */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full shadow-md shadow-red-600/20 transform hover:scale-105 transition-transform">
                        <Flame size={12} className="text-white fill-white" />
                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Member</span>
                    </div>
                </div>


                {/* Content Container */}
                <div className="max-w-xl mx-auto px-5 space-y-8">

                    {/* Stats Row - Clean White Cards with Red Accents */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center justify-center gap-1 group hover:border-red-200 transition-colors">
                            <span className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-red-600 transition-colors">12</span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Trips</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center justify-center gap-1 group hover:border-red-200 transition-colors">
                            <span className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-red-600 transition-colors">3.5<span className="text-sm font-semibold text-neutral-400 ml-0.5">h</span></span>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Saved</span>
                        </div>
                    </div>


                    {/* Section: Recent Activity */}
                    <div>
                        <div className="flex items-center justify-between px-1 mb-2">
                            <h3 className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Recent Activity</h3>
                            <button className="text-red-600 text-[11px] font-bold hover:text-red-700 transition-colors bg-red-50 px-2 py-1 rounded-md">View All</button>
                        </div>

                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200/60 divide-y divide-neutral-100">
                            {/* List Item 1 */}
                            <button className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                        PR
                                    </div>
                                    <div>
                                        <div className="font-bold text-neutral-900 text-[15px]">MNL <span className="text-neutral-300 mx-1">→</span> NRT</div>
                                        <div className="text-xs text-neutral-500 font-medium mt-0.5">Dec 5 • Flight PR123</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-100">On Time</span>
                                    <ChevronRight size={16} className="text-neutral-300 group-hover:text-red-400 transition-colors" />
                                </div>
                            </button>

                            {/* List Item 2 */}
                            <button className="w-full p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                        CEB
                                    </div>
                                    <div>
                                        <div className="font-bold text-neutral-900 text-[15px]">CEB <span className="text-neutral-300 mx-1">→</span> MNL</div>
                                        <div className="text-xs text-neutral-500 font-medium mt-0.5">Nov 28 • Flight 5J456</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ChevronRight size={16} className="text-neutral-300 group-hover:text-red-400 transition-colors" />
                                </div>
                            </button>
                        </div>
                    </div>


                    {/* Logout Action - More subtle but accessible */}
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full bg-white border border-neutral-200 py-3.5 text-red-600 font-semibold text-[15px] hover:bg-red-50 rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 mb-8"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
