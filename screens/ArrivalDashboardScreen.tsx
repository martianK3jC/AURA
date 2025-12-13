
import React, { useState, useEffect } from 'react';
import { ScreenId, TravelerContext, ArrivalTimelineStep } from '../types';
import { Plane, Users, Luggage, Car, ArrowRight, MapPin, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import TravelerChatbot from '../components/TravelerChatbot';

interface Props {
    onNavigate: (screen: ScreenId) => void;
    travelerContext?: TravelerContext;
}

const ArrivalDashboardScreen: React.FC<Props> = ({ onNavigate, travelerContext }) => {
    const [currentStage, setCurrentStage] = useState<number>(0);
    const [isAnimated, setIsAnimated] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Trigger entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Mock arrival timeline data
    const arrivalSteps: ArrivalTimelineStep[] = [
        {
            id: '1',
            stage: 'landing',
            title: 'Landing',
            description: 'Welcome to Cebu!',
            estimatedDuration: 12,
            status: 'completed',
            location: 'MCIA Runway',
        },
        {
            id: '2',
            stage: 'immigration',
            title: 'Immigration',
            description: 'Document check & processing',
            estimatedDuration: 8,
            status: 'in-progress',
            waitTime: 8,
            location: 'Immigration Hall',
        },
        {
            id: '3',
            stage: 'baggage',
            title: 'Baggage Claim',
            description: 'Collect your luggage',
            estimatedDuration: 5,
            status: 'pending',
            waitTime: 5,
            location: 'Carousel 2',
        },
        {
            id: '4',
            stage: 'transportation',
            title: 'Ground Transportation',
            description: 'Choose your ride to destination',
            estimatedDuration: 0,
            status: 'pending',
            location: 'Arrival Bay',
        },
    ];

    const getStepIcon = (stage: string) => {
        switch (stage) {
            case 'landing':
                return Plane;
            case 'immigration':
                return Users;
            case 'baggage':
                return Luggage;
            case 'transportation':
                return Car;
            default:
                return MapPin;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-amber-50 border-amber-400 text-amber-700';
            case 'in-progress':
                return 'bg-red-50 border-red-200 text-red-700';
            case 'pending':
                return 'bg-slate-50 border-slate-200 text-slate-500';
            default:
                return 'bg-slate-50 border-slate-200 text-slate-500';
        }
    };

    const totalEstimatedTime = arrivalSteps.reduce((acc, step) => acc + step.estimatedDuration, 0);
    const userName = travelerContext?.userName || 'Traveler';
    const flightNumber = travelerContext?.flightNumber || 'Your Flight';

    return (
        <div className="h-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20 overflow-y-auto pb-32 relative">
            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-32 right-16 w-80 h-80 bg-yellow-200/8 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-16 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header - Warm Yellow/Orange for Arrival */}
            <div className={`sticky top-0 bg-gradient-to-br from-yellow-500 to-orange-600 text-white px-6 pt-8 pb-10 shadow-xl transition-all duration-300 ease-out relative z-50 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                }`}>
                <div className="max-w-2xl mx-auto">
                    {/* Welcome Message */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                            <Plane className="transform -rotate-45" size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Welcome to Cebu, {userName}!</h1>
                            <p className="text-orange-100 text-sm">{flightNumber} has landed</p>
                        </div>
                    </div>

                    {/* Estimated Time Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                        <Clock size={18} />
                        <span className="font-semibold">Est. time to exit: {totalEstimatedTime} minutes</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 mt-8">
                {/* Journey Timeline */}
                <div className={`space-y-4 transition-all duration-300 ease-out delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Arrival Journey</h2>
                        <p className="text-sm text-gray-600">Track your progress from landing to ground transportation</p>
                    </div>

                    {arrivalSteps.map((step, index) => {
                        const Icon = getStepIcon(step.stage);
                        const isCompleted = step.status === 'completed';
                        const isCurrent = step.status === 'in-progress';
                        const statusColorClass = getStatusColor(step.status);

                        return (
                            <div key={step.id} className="relative">
                                {/* Connector Line */}
                                {index < arrivalSteps.length - 1 && (
                                    <div className={`absolute left-[27px] top-16 w-0.5 h-20 ${isCompleted ? 'bg-amber-500' : 'bg-slate-200'
                                        } transition-colors duration-500`}></div>
                                )}

                                <GlassCard className={`p-6 transition-all duration-300 ${isCurrent ? 'ring-2 ring-red-500 ring-offset-2 shadow-xl shadow-red-500/10 scale-[1.02] bg-gradient-to-br from-white to-red-50/30' : 'hover:shadow-md'}`}>
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${statusColorClass}`}>
                                            {isCompleted ? (
                                                <CheckCircle size={28} className="text-amber-600" />
                                            ) : (
                                                <Icon size={28} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className={`font-bold text-lg ${isCurrent ? 'text-red-900' : 'text-gray-900'}`}>{step.title}</h3>
                                                {step.waitTime && isCurrent && (
                                                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                                                        {step.waitTime} min wait
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 text-sm mb-2">{step.description}</p>

                                            {step.location && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <MapPin size={14} />
                                                    <span>{step.location}</span>
                                                </div>
                                            )}

                                            {/* Current Step Indicator */}
                                            {isCurrent && (
                                                <div className="mt-3 flex items-center gap-2 text-sm font-bold text-red-700">
                                                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                                                    <span>YOU ARE HERE</span>
                                                </div>
                                            )}

                                            {/* Completed Check */}
                                            {isCompleted && (
                                                <div className="mt-2 text-sm text-amber-600 font-medium flex items-center gap-1">
                                                    <CheckCircle size={16} />
                                                    <span>Completed</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        );
                    })}
                </div>

                {/* Next Step CTA */}
                <div className={`mt-8 transition-all duration-300 ease-out delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <GlassCard className="p-6 bg-gradient-to-r from-white to-rose-50 border border-rose-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-full p-3 shadow-lg shadow-red-500/20">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Where are you headed?</h3>
                                <p className="text-gray-500 text-sm">Let's find the best way to your destination</p>
                            </div>
                        </div>

                        <button
                            onClick={() => onNavigate('destination-input')}
                            className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20"
                        >
                            <span className="text-lg">Choose Destination</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    </GlassCard>
                </div>

                {/* Helpful Tips */}
                <div className={`mt-6 transition-all duration-300 ease-out delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Helpful Tips
                        </h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Free WiFi available throughout the airport</li>
                            <li>• Currency exchange counters near baggage claim</li>
                            <li>• ATMs located at the arrival hall exit</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Chatbot FAB */}
            <button
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-yellow-500 w-14 h-14 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                <MessageCircle size={28} className="relative z-10" />
            </button>

            {/* Chatbot Modal */}
            <TravelerChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ArrivalDashboardScreen;
