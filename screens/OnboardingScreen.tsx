import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Sparkles, Activity, MapPin, ArrowRight } from 'lucide-react';

interface Props {
    onNavigate: (screen: ScreenId) => void;
}

const OnboardingScreen: React.FC<Props> = ({ onNavigate }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Your Intelligent Companion",
            desc: "AURA predicts airport traffic and guides you seamlessly from curb to gate.",
            icon: <Sparkles size={48} className="text-violet-400" />,
            color: "from-violet-500/20 to-fuchsia-500/20"
        },
        {
            title: "Predictive Insights",
            desc: "Get real-time alerts about security lines, traffic jams, and flight changes before they impact you.",
            icon: <Activity size={48} className="text-cyan-400" />,
            color: "from-cyan-500/20 to-blue-500/20"
        },
        {
            title: "Step-by-Step Guidance",
            desc: "Never get lost. Interactive maps and timeline cards assume the stress of travel.",
            icon: <MapPin size={48} className="text-emerald-400" />,
            color: "from-emerald-500/20 to-green-500/20"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onNavigate('scenario-b');
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Skip Button */}
            <button
                onClick={() => onNavigate('scenario-b')}
                className="absolute top-6 right-6 text-slate-400 hover:text-white font-medium text-sm flex items-center gap-1 z-50 p-2 rounded-full hover:bg-white/5 active:scale-95 transition-all"
            >
                Skip <ArrowRight size={14} />
            </button>

            {/* Background Blobs */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full blur-[100px] bg-gradient-to-br ${steps[step].color} transition-all duration-1000 -z-10`}></div>

            {/* Content Container */}
            <div className="w-full max-w-md flex flex-col items-center relative z-10">

                {/* Step Content with Animation */}
                <div key={step} className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 w-full mb-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative w-24 h-24 rounded-full bg-slate-900/50 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
                            {steps[step].icon}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">{steps[step].title}</h2>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xs mx-auto">{steps[step].desc}</p>
                    </div>
                </div>

                {/* Footer: Dots & Button */}
                <div className="w-full space-y-8">
                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}></div>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full bg-white hover:bg-slate-200 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2"
                    >
                        {step === steps.length - 1 ? 'Get Started' : 'Next'}
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingScreen;
