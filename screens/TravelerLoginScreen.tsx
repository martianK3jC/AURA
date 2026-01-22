
import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ArrowRight } from 'lucide-react';
import auraLogo from '../img/aura_logo.png';

interface Props {
    onNavigate: (screen: ScreenId, context?: TravelerContext) => void;
}

export interface TravelerContext {
    travelDirection: 'arrival' | 'departure';
    flightNumber?: string;
    isGuest: boolean;
    userName?: string;
}

const TravelerLoginScreen: React.FC<Props> = ({ onNavigate }) => {
    const [flightNumber, setFlightNumber] = useState('OM 213');

    return (
        <div className="h-[100dvh] w-full flex flex-col items-center relative overflow-y-auto font-sans bg-[#FFF5F5] py-10 px-4 pb-safe scrollbar-hide">

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-rose-200/20 rounded-full blur-[150px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-red-200/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md my-auto animate-slide-up">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img src={auraLogo} alt="AURA Logo" className="w-20 h-20 rounded-3xl object-contain drop-shadow-2xl animate-float-slow" />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Welcome, Anna!</h1>
                    <p className="text-gray-500 font-medium">Ready for your flight to Narita?</p>
                </div>

                {/* Card Container */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 space-y-6">

                    <div className="space-y-4 animate-fade-in">

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Flight Number</label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className={`relative bg-white border-2 border-gray-200 focus-within:border-red-500 rounded-xl px-4 py-3 flex items-center gap-3 transition-all`}>
                                    <span className="text-gray-400">✈️</span>
                                    <input
                                        type="text"
                                        value={flightNumber}
                                        onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                                        placeholder="e.g., OM 213"
                                        className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={() => {
                                const context: TravelerContext = {
                                    travelDirection: 'departure',
                                    userName: 'Anna',
                                    flightNumber: flightNumber || 'OM 213',
                                    isGuest: false,
                                };
                                // Skip onboarding, go straight to Dashboard (Scenario A - Early/Relaxed)
                                onNavigate('scenario-a', context);
                            }}
                            className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20"
                        >
                            <span className="text-lg">View My Journey</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>

                        <button
                            onClick={() => onNavigate('landing')}
                            className="w-full text-center text-gray-400 hover:text-gray-600 text-sm font-medium mt-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-xs text-gray-500">
                    <p>Powered by Vertex AI • MCIA Navigator v2.0.4</p>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
        </div >
    );
};

export default TravelerLoginScreen;
