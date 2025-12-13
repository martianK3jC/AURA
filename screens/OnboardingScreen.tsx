
import React, { useState, useEffect } from 'react';
import { ScreenId, TravelerContext } from '../types';
import { Sparkles, Activity, MapPin, ArrowRight, Plane, User } from 'lucide-react';

interface Props {
    onNavigate: (screen: ScreenId) => void;
    travelerContext?: TravelerContext;
}

const OnboardingScreen: React.FC<Props> = ({ onNavigate, travelerContext }) => {
    const [step, setStep] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const userName = travelerContext?.userName || 'Traveler';
    const travelDirection = travelerContext?.travelDirection || 'departure';
    const isArrival = travelDirection === 'arrival';

    // Customize onboarding based on travel direction
    const steps = isArrival ? [
        {
            title: `Welcome to Cebu, ${userName}!`,
            desc: "AURA will help you navigate from arrivals to your destination smoothly and stress-free.",
            icon: <Plane size={48} className="text-yellow-600 transform -rotate-45" />,
            color: "from-yellow-500/20 to-orange-500/20"
        },
        {
            title: "Ground Transportation Made Easy",
            desc: "Compare prices for Grab, taxis, and shuttles. We'll guide you to the best option.",
            icon: <Activity size={48} className="text-orange-600" />,
            color: "from-orange-400/20 to-yellow-400/20"
        },
        {
            title: "Live Route Tracking",
            desc: "Track your ride in real-time with ETA updates and traffic conditions.",
            icon: <MapPin size={48} className="text-amber-600" />,
            color: "from-amber-500/20 to-orange-500/20"
        }
    ] : [
        {
            title: `Ready for Takeoff, ${userName}?`,
            desc: "AURA predicts airport traffic and guides you seamlessly from curb to gate.",
            icon: <Plane size={48} className="text-red-600 transform rotate-45" />,
            color: "from-red-500/20 to-orange-500/20"
        },
        {
            title: "Predictive Insights",
            desc: "Get real-time alerts about security lines, traffic jams, and flight changes before they impact you.",
            icon: <Activity size={48} className="text-amber-500" />,
            color: "from-amber-400/20 to-red-400/20"
        },
        {
            title: "Step-by-Step Guidance",
            desc: "Never get lost. Interactive maps and timeline cards remove the stress of travel.",
            icon: <MapPin size={48} className="text-red-600" />,
            color: "from-red-500/20 to-amber-500/20"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // Navigate based on travel direction
            if (isArrival) {
                onNavigate('arrival-dashboard');
            } else {
                onNavigate('scenario-b'); // Departure dashboard
            }
        }
    };

    const handleSkip = () => {
        if (isArrival) {
            onNavigate('arrival-dashboard');
        } else {
            onNavigate('scenario-b');
        }
    };

    return (
        <div className={`h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden p-6 transition-all duration-300 ease-out ${isAnimated ? 'opacity-100' : 'opacity-0'
            }`}>
            {/* Travel Direction Badge */}
            {travelerContext && (
                <div className="absolute top-6 left-6 z-50">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-md ${isArrival
                        ? 'bg-yellow-100/80 border-yellow-400 text-yellow-700'
                        : 'bg-purple-100/80 border-purple-400 text-purple-700'
                        }`}>
                        {isArrival ? '🛬 Arrival' : '🛫 Departure'}
                    </div>
                </div>
            )}

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute top-6 right-6 text-stone-500 hover:text-[var(--aura-text-primary)] font-medium text-sm flex items-center gap-1 z-50 p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all"
            >
                Skip <ArrowRight size={14} />
            </button>

            {/* Background Accent Blob - Centered */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] bg-gradient-to-br ${steps[step].color} transition-all duration-1000 -z-10`}></div>

            {/* Content Container - Centered */}
            <div className="w-full max-w-md flex flex-col items-center relative z-10 -mt-8">

                {/* Personalized Greeting */}
                {travelerContext && step === 0 && (
                    <div className="mb-4 text-center animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                            <User size={16} className="text-red-600" />
                            <span className="text-sm font-semibold text-gray-700">
                                {userName}
                            </span>
                        </div>
                    </div>
                )}

                {/* Step Content with Animation */}
                <div key={step} className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 w-full mb-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative w-24 h-24 rounded-full bg-white/60 border border-stone-200 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-red-500/10">
                            {steps[step].icon}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--aura-text-primary)] tracking-tight drop-shadow-sm">{steps[step].title}</h2>
                        <p className="text-[var(--aura-text-secondary)] text-base md:text-lg leading-relaxed max-w-xs mx-auto">{steps[step].desc}</p>
                    </div>
                </div>

                {/* Footer: Dots & Button */}
                <div className="w-full space-y-8">
                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-red-600' : 'w-2 bg-stone-300'}`}></div>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:shadow-[0_4px_20px_rgba(211,47,47,0.4)] text-white font-bold py-4 rounded-xl shadow-[0_4px_10px_rgba(211,47,47,0.2)] active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2"
                    >
                        {step === steps.length - 1 ? 'Get Started' : 'Next'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default OnboardingScreen;
