
import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { MapPin, Navigation, Clock, Phone, MessageCircle, ArrowLeft, CheckCircle2, Utensils, Coffee, Star, AlertCircle, Share2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Props {
    onNavigate: (screen: ScreenId) => void;
}

const RouteTrackingScreen: React.FC<Props> = ({ onNavigate }) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const [currentETA, setCurrentETA] = useState(28);
    const [progress, setProgress] = useState(15);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Mactan-Mandaue Bridge');
    const [trafficLevel, setTrafficLevel] = useState<'light' | 'moderate' | 'heavy'>('moderate');

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Simulate ETA countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentETA((prev) => {
                if (prev > 0) return prev - 1;
                return 0;
            });
            setProgress((prev) => {
                if (prev < 100) return prev + 2;
                return 100;
            });
        }, 3000); // Update every 3 seconds for demo

        return () => clearInterval(interval);
    }, []);

    // Mock driver info
    const driverInfo = {
        name: 'Juan dela Cruz',
        vehicle: 'Toyota Vios',
        plateNumber: 'ABC 1234',
        rating: 4.9,
        photo: '👨'
    };

    // Mock destination
    const destination = {
        name: 'Radisson Blu Cebu',
        address: 'Serging Osmeña Blvd, Cebu City'
    };

    // Mock route stops
    const routeStops = [
        { name: 'MCIA - Mactan Airport', status: 'completed', time: '2:15 PM' },
        { name: 'Mactan-Mandaue Bridge', status: 'current', time: 'Now' },
        { name: 'Mandaue City Center', status: 'upcoming', time: `~${Math.ceil(currentETA * 0.4)} min` },
        { name: 'Radisson Blu Cebu', status: 'upcoming', time: `~${currentETA} min` }
    ];

    // Mock nearby recommendations
    const nearbyPlaces = [
        {
            name: 'Jollibee Mandaue',
            type: 'restaurant',
            detour: '+5 min',
            rating: 4.5,
            icon: '🍔'
        },
        {
            name: 'Starbucks Oakridge',
            type: 'cafe',
            detour: '+3 min',
            rating: 4.7,
            icon: '☕'
        }
    ];

    const getTrafficColor = (level: string) => {
        switch (level) {
            case 'light': return 'text-green-600 bg-green-100';
            case 'moderate': return 'text-orange-600 bg-orange-100';
            case 'heavy': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTrafficText = (level: string) => {
        switch (level) {
            case 'light': return 'Light Traffic';
            case 'moderate': return 'Moderate Traffic';
            case 'heavy': return 'Heavy Traffic';
            default: return 'Unknown';
        }
    };

    return (
        <div className="h-full min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-yellow-50/20 overflow-y-auto pb-32 relative">
            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 left-10 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header - Warm Yellow/Orange for Arrival */}
            <div className={`sticky top-0 w-full z-20 bg-gradient-to-br from-yellow-500 to-orange-600 text-white px-6 pt-6 pb-6 shadow-xl transition-all duration-300 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                }`}>
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => onNavigate('transportation-options')}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Ride is On the Way</h1>
                            <p className="text-orange-100 text-base">Track your journey in real-time</p>
                        </div>

                        {/* Share Trip Button */}
                        <button
                            onClick={() => {
                                // Share trip functionality
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'My Trip to Radisson Blu Cebu',
                                        text: `I'm on my way to ${destination.name}. ETA: ${currentETA} min. Track me here: [link]`
                                    });
                                }
                            }}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-colors border border-white/30"
                            title="Share Trip"
                        >
                            <Share2 size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Emergency Button moved to bottom of content to prevent accidental presses */}

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 mt-6">
                {/* ETA Card */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <GlassCard className="p-6 bg-gradient-to-br from-white to-orange-50/30 border border-orange-100 relative group">

                        {/* 2x Speed Simulation Button - Hidden trigger usually, but visible for demo */}
                        <button
                            onClick={() => {
                                setCurrentETA(0);
                                setProgress(100);
                            }}
                            className="absolute top-4 right-4 bg-orange-100 hover:bg-orange-200 text-orange-800 p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 z-20 border border-orange-200"
                            title="Simulate Fast Forward"
                        >
                            <span>⏩ 2x</span>
                        </button>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full p-3 shadow-lg shadow-orange-500/20">
                                    <Clock className="text-white" size={28} />
                                </div>
                                <div>
                                    <p className="text-base text-gray-600">Estimated Arrival</p>
                                    <p className="text-3xl font-bold text-orange-700">{currentETA} min</p>
                                </div>
                            </div>
                            <div className="text-right mt-8">
                                <p className="text-sm text-gray-600">Distance</p>
                                <p className="text-xl font-bold text-gray-900">8.2 km</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-yellow-500 to-orange-600 h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Traffic Status */}
                        <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getTrafficColor(trafficLevel)}`}>
                                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                                {getTrafficText(trafficLevel)}
                            </span>
                            <span className="text-xs text-gray-500">Via Mactan-Mandaue Bridge</span>
                        </div>
                    </GlassCard>
                </div>

                {/* Map Placeholder */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-150 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="relative bg-orange-50/50 rounded-2xl h-64 overflow-hidden border border-orange-200 shadow-lg">
                        {/* Map Background Pattern (Abstract Roads/Water) */}
                        <div className="absolute inset-0 opacity-20">
                            {/* Water (Mactan Channel) */}
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-200 blur-3xl transform translate-x-10"></div>
                            {/* Grid/Roads */}
                            <svg className="w-full h-full" width="100%" height="100%">
                                <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        {/* Interactive Route Visualization */}
                        <div className="absolute inset-0">
                            <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                                {/* Route Path Glow */}
                                <path
                                    d="M 50 200 Q 150 150, 250 125 T 350 50"
                                    stroke="url(#routeGlow)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    className="drop-shadow-lg"
                                />
                                {/* Main Route Line */}
                                <path
                                    d="M 50 200 Q 150 150, 250 125 T 350 50"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray="6 4"
                                />

                                {/* Start Point (Airport) */}
                                <circle cx="50" cy="200" r="6" fill="#f59e0b" stroke="white" strokeWidth="2" />

                                {/* End Point (Destination) */}
                                <circle cx="350" cy="50" r="6" fill="#dc2626" stroke="white" strokeWidth="2" />

                                <defs>
                                    <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#fb923c" />
                                        <stop offset="100%" stopColor="#f59e0b" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Moving Vehicle Indicator */}
                            <div
                                className="absolute w-8 h-8 -ml-4 -mt-4 transition-all duration-[3000ms] linear z-10"
                                style={{
                                    left: `${50 + (300 * progress / 100)}px`, // Approximate linear movement X
                                    top: `${200 - (150 * progress / 100)}px`  // Approximate linear movement Y
                                    // Note: Real path is curved, but linear approx is okay for this abstract view or I'd need complex path logic
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-orange-500 rounded-full opacity-30 animate-ping"></div>
                                    <div className="relative bg-white p-1.5 rounded-full shadow-md border-2 border-orange-500">
                                        <Navigation size={14} className="text-orange-600 transform rotate-45" />
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">
                                        {currentETA} min
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Labels */}
                        <div className="absolute bottom-3 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-500 border border-white/50">
                            LIVE TRACKING
                        </div>
                    </div>
                </div>

                {/* Driver Info */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Your Driver</h2>
                    <GlassCard className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-3xl shadow-md">
                                    {driverInfo.photo}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{driverInfo.name}</h3>
                                    <p className="text-base text-gray-600">{driverInfo.vehicle} • {driverInfo.plateNumber}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-semibold text-gray-700">{driverInfo.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="flex gap-2">
                                <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors">
                                    <Phone size={20} />
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
                                    <MessageCircle size={20} />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Route Timeline */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-250 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Route Progress</h2>
                    <div className="space-y-3">
                        {routeStops.map((stop, index) => {
                            const isCurrent = stop.status === 'current';
                            const isCompleted = stop.status === 'completed';

                            return (
                                <div key={index} className="relative">
                                    {/* Connector Line */}
                                    {index < routeStops.length - 1 && (
                                        <div className={`absolute left-[23px] top-12 w-0.5 h-12 ${isCompleted ? 'bg-amber-400' : 'bg-gray-300'
                                            }`}></div>
                                    )}

                                    <div className={`flex items-start gap-3 ${isCurrent ? 'bg-orange-50 p-3 rounded-xl' : ''}`}>
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-amber-500 border-amber-500' :
                                            isCurrent ? 'bg-white border-orange-500' :
                                                'bg-white border-gray-300'
                                            }`}>
                                            {isCompleted ? (
                                                <CheckCircle2 size={24} className="text-white" />
                                            ) : isCurrent ? (
                                                <Navigation size={24} className="text-orange-600" />
                                            ) : (
                                                <MapPin size={24} className="text-gray-400" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className={`font-bold ${isCurrent ? 'text-orange-700' : 'text-gray-900'}`}>
                                                {stop.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{stop.time}</p>
                                            {isCurrent && (
                                                <p className="text-xs text-orange-600 font-semibold mt-1 flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                                                    Passing through now
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* En-Route Suggestions */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-300 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Utensils size={20} className="text-orange-600" />
                        Hungry? Nearby Stops
                    </h2>
                    <div className="space-y-2">
                        {nearbyPlaces.map((place, index) => (
                            <GlassCard key={index} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{place.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{place.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                <span>{place.rating}</span>
                                                <span>•</span>
                                                <span className="text-orange-600">{place.detour} detour</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                                        Add Stop
                                    </button>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Safety Banner */}
                <div className={`transition-all duration-300 ease-out delay-350 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-green-900 mb-1">Safe Ride Guaranteed</h4>
                                <p className="text-sm text-green-800">Your journey is tracked and insured. Share your ETA with family via SMS.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Help Section (Static Position) */}
                <div className={`mt-8 mb-6 transition-all duration-300 ease-out delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <button
                        onClick={() => setShowEmergencyModal(true)}
                        className="w-full bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                    >
                        <AlertCircle size={24} className="text-red-600" />
                        <span>Emergency Assistance</span>
                    </button>
                    <p className="text-center text-xs text-red-400 mt-2">Only use in case of emergency. Location will be shared.</p>
                </div>
            </div>

            {/* Arrival Confirmation Modal (when ETA = 0) */}
            {currentETA === 0 && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 animate-fade-in">
                    <GlassCard className="max-w-md w-full p-8 text-center">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={48} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">You've Arrived!</h2>
                        <p className="text-gray-600 mb-6">Welcome to {destination.name}</p>
                        <button
                            onClick={() => onNavigate('profile')}
                            className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all border-t border-white/20"
                        >
                            Complete Journey
                        </button>
                    </GlassCard>
                </div>
            )}

            {/* Emergency Modal */}
            {showEmergencyModal && (
                <div className="fixed inset-0 bg-red-900/80 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
                    <GlassCard className="max-w-md w-full p-6 text-center border-red-500/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                        <div className="relative z-10">
                            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
                                <AlertCircle size={48} className="text-red-600" />
                            </div>
                            <h2 className="text-2xl font-black text-red-700 mb-2 uppercase tracking-wide">Emergency Help</h2>
                            <p className="text-gray-700 mb-6 font-medium">
                                Do you need immediate assistance? Your location will be shared with our 24/7 Response Team.
                            </p>

                            <div className="bg-white/80 rounded-xl p-4 mb-6 border border-red-200">
                                <div className="flex justify-between items-center mb-2 border-b border-red-100 pb-2">
                                    <span className="text-sm font-bold text-gray-500">HOTLINE</span>
                                    <span className="text-lg font-black text-red-600">+63 123 456 7890</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500">LOCATION</span>
                                    <span className="text-sm font-bold text-gray-800">{currentLocation}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => {
                                        alert("Calling 911..."); // Simulate call
                                        setShowEmergencyModal(false);
                                    }}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone size={20} />
                                    <span>Call Emergency Services</span>
                                </button>
                                <button
                                    onClick={() => setShowEmergencyModal(false)}
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            )}

            {/* CSS Animations */}
            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default RouteTrackingScreen;
