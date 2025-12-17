
import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ArrowRight, Plane, User, ChevronRight } from 'lucide-react';
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
    const [step, setStep] = useState<'direction' | 'details'>('direction');
    const [travelDirection, setTravelDirection] = useState<'arrival' | 'departure' | null>(null);
    const [flightNumber, setFlightNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [errorField, setErrorField] = useState<'name' | 'flight' | 'both' | null>(null); // Track which field has error

    const handleDirectionSelect = (direction: 'arrival' | 'departure') => {
        setTravelDirection(direction);
        setStep('details');
    };

    // Strict flight number validation
    const validateFlightNumber = (flight: string): { valid: boolean; message: string } => {
        if (!flight) return { valid: true, message: '' }; // Optional field

        // Remove extra spaces and convert to uppercase
        const cleaned = flight.trim().toUpperCase().replace(/\s+/g, ' ');

        // Format: 2-3 letter/digit airline code + optional space + 1-4 digit flight number
        // Examples: PR 123, 5J 567, CEB 803, Z2 456, PR123
        const regex = /^[A-Z0-9]{2,3}\s?\d{1,4}$/;

        if (!regex.test(cleaned)) {
            return {
                valid: false,
                message: 'Invalid format. Use airline code + number (e.g., PR 123)'
            };
        }

        // Mock "flight not found" for demo purposes
        if (cleaned === 'XYZ999' || cleaned === 'XYZ 999') {
            return {
                valid: false,
                message: '✈️ Flight not found. Please check your flight number.'
            };
        }

        return { valid: true, message: '' };
    };

    const handleContinue = () => {
        if (!travelDirection) {
            setError('Please select your journey type');
            return;
        }

        // Name is now OPTIONAL (UX Fix)
        const isFlightEmpty = !flightNumber.trim();

        // Case 1: Only Flight is empty (Name is optional)
        if (isFlightEmpty) {
            setError('Please fill out the flight number');
            setErrorField('flight');
            return;
        }

        // Case 3: Only Flight is empty
        if (isFlightEmpty) {
            setError('Please fill out the flight number');
            setErrorField('flight');
            return;
        }

        // Case 4: Flight format validation
        const validation = validateFlightNumber(flightNumber);
        if (!validation.valid) {
            setError(validation.message);
            setErrorField('flight');
            return;
        }

        setError('');
        setErrorField(null); // Clear error field

        const context: TravelerContext = {
            travelDirection,
            userName: userName.trim() || 'Traveler', // Default if empty
            flightNumber: flightNumber || undefined,
            isGuest: false, // Guest mode removed, always personalized
        };

        // Navigate to appropriate screen based on travel direction
        if (travelDirection === 'arrival') {
            // For arrival: go to arrival dashboard/timeline
            onNavigate('arrival-dashboard', context);
        } else {
            // For departure: go to regular dashboard
            onNavigate('onboarding', context);
        }
    };

    const handleBack = () => {
        setStep('direction');
        setError('');
    };

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
                    <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Let's get you there.</h1>
                    <p className="text-gray-500 font-medium">Start your AURA journey</p>
                </div>

                {/* Card Container */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 space-y-6">



                    {/* Step Indicator - Fixed Colors (Brand Red) */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className={`h-2 rounded-full transition-all ${step === 'direction' ? 'bg-red-600 w-8' : 'w-2 bg-gray-200'}`}></div>
                        <div className={`h-2 rounded-full transition-all ${step === 'details' ? 'bg-red-600 w-8' : 'w-2 bg-gray-200'}`}></div>
                    </div>

                    {/* Step 1: Travel Direction Selection */}
                    {step === 'direction' && (
                        <div className="space-y-4 animate-fade-in">
                            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                                Select your Journey
                            </h2>

                            {/* Arrival Option */}
                            <button
                                onClick={() => handleDirectionSelect('arrival')}
                                className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:border-yellow-400 rounded-2xl p-6 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-yellow-500 rounded-full p-3 group-hover:scale-110 transition-transform">
                                        <Plane className="transform -rotate-45 text-white" size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">Arrival</h3>
                                        <p className="text-sm text-gray-600">I just landed in Cebu</p>
                                    </div>
                                    <ChevronRight className="text-yellow-500 group-hover:translate-x-1 transition-transform" size={24} />
                                </div>
                            </button>

                            {/* Departure Option - BLUE/SLATE (UX Fix: Safe/Professional vs Red/Danger) */}
                            <button
                                onClick={() => handleDirectionSelect('departure')}
                                className="w-full bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-700 rounded-full p-3 group-hover:scale-110 transition-transform">
                                        <Plane className="text-white transform rotate-45" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-lg">Going to the Airport</h3>
                                        <p className="text-gray-600 text-sm">Navigate to MCIA for your departing flight</p>
                                    </div>
                                    <ChevronRight className="text-slate-500 group-hover:translate-x-1 transition-transform" size={24} />
                                </div>
                            </button>

                            {/* Back to Landing */}
                            <button
                                onClick={() => onNavigate('landing')}
                                className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors py-2 font-medium"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    )}

                    {/* Step 2: Flight Details */}
                    {step === 'details' && travelDirection && (
                        <div className="space-y-4 animate-fade-in">
                            {/* Header with selected direction */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={handleBack}
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    ← Back
                                </button>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${travelDirection === 'arrival'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-slate-100 text-slate-700'
                                    }`}>
                                    {travelDirection === 'arrival' ? '✈️ Arrival' : '🛫 Departure'}
                                </div>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
                                Enter Your Details
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Name (Optional)</label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className={`relative bg-white border-2 ${(errorField === 'name' || errorField === 'both') ? 'border-red-500 animate-shake' : 'border-gray-200'} focus-within:border-red-500 rounded-xl px-4 py-3 flex items-center gap-3 transition-all`}>
                                        <User className="text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => {
                                                setUserName(e.target.value);
                                                // Clear error if resolving specific or general error
                                                if (errorField === 'name' || errorField === 'both') {
                                                    setError('');
                                                    setErrorField(null);
                                                }
                                            }}
                                            placeholder="What should we call you?"
                                            className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Flight Number Input (Required) */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Flight Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-red-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className={`relative bg-white border-2 ${(errorField === 'flight' || errorField === 'both') ? 'border-red-500 animate-shake' : 'border-gray-200'} focus-within:border-red-500 rounded-xl px-4 py-3 flex items-center gap-3 transition-all`}>
                                        <span className="text-gray-400">✈️</span>
                                        <input
                                            type="text"
                                            value={flightNumber}
                                            onChange={(e) => {
                                                setFlightNumber(e.target.value.toUpperCase());
                                                if (errorField === 'flight' || errorField === 'both') {
                                                    setError('');
                                                    setErrorField(null);
                                                }
                                            }}
                                            placeholder="e.g., PR 123, 5J 567"
                                            className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                            </div>

                            {/* Continue Button */}
                            <button
                                onClick={handleContinue}
                                className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20"
                            >
                                <span className="text-lg">Continue</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </div>
                    )}
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
