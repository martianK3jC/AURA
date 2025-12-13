import React from 'react';
import { AlertTriangle, Wind, CloudRain, Info, X } from 'lucide-react';
import GlassCard from './GlassCard';

interface DisasterAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'typhoon' | 'earthquake' | 'fire';
}

const DisasterAlertModal: React.FC<DisasterAlertModalProps> = ({ isOpen, onClose, type = 'typhoon' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm animate-in slide-in-from-bottom-10 zoom-in-95 duration-300">
                <GlassCard className="border-0 overflow-hidden shadow-2xl relative bg-neutral-900 ring-2 ring-red-500/50">
                    {/* Background Animation - Threatening */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-neutral-900 to-neutral-900"></div>
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-red-600/20 to-transparent animate-pulse"></div>

                    <div className="relative z-10 p-6 text-center">
                        {/* Huge Warning Icon */}
                        <div className="w-20 h-20 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-bounce-low">
                            <Wind size={40} className="text-white" />
                        </div>

                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">
                            Typhoon Alert
                        </h2>
                        <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-4 animate-pulse">
                            SIGNAL NO. 2 DETECTED
                        </span>

                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Cebu City is under <strong>Tropical Storm Warning</strong>. Flights may be delayed or cancelled.
                        </p>

                        {/* Status Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-400 uppercase font-bold">Your Flight</span>
                                <span className="text-xs text-red-400 font-bold">Monitor Status</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                                    <CloudRain size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">PR 123 to Narita</p>
                                    <p className="text-yellow-500 text-xs">⚠️ Possible Delay (+2h)</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 flex-col">
                            <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95">
                                View Rebooking Options
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                    <style>{`
                        @keyframes bounce-low {
                            0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
                            50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
                        }
                        .animate-bounce-low {
                            animation: bounce-low 2s infinite;
                        }
                    `}</style>
                </GlassCard>
            </div>
        </div>
    );
};

export default DisasterAlertModal;
