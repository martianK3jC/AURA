
import React, { useState, useEffect } from 'react';
import { ScreenId, TransportationOption } from '../types';
import { Car, Phone, Smartphone, Bus, ArrowLeft, ArrowRight, Clock, DollarSign, MapPin, Star, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Props {
    onNavigate: (screen: ScreenId) => void;
}

const TransportationOptionsScreen: React.FC<Props> = ({ onNavigate }) => {
    const [selectedOption, setSelectedOption] = useState<TransportationOption | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Mock transportation options data
    const transportOptions: TransportationOption[] = [
        {
            id: '1',
            type: 'grab',
            name: 'Grab Car',
            description: 'Book via app, cashless payment',
            priceRange: {
                min: 450,
                max: 550,
                currency: '₱'
            },
            estimatedDuration: 35,
            availability: 'available',
            features: ['Cashless', 'Track driver', 'AC vehicle', 'Fastest route'],
            icon: '🚗',
            bookingMethod: 'app',
            pickupLocation: 'Arrival Bay A'
        },
        {
            id: '2',
            type: 'taxi',
            name: 'Airport Taxi',
            description: 'Metered or fixed rate',
            priceRange: {
                min: 500,
                max: 500,
                currency: '₱'
            },
            estimatedDuration: 40,
            availability: 'available',
            features: ['Fixed rate', 'Official MCIA taxi', 'AC vehicle', 'Credit card OK'],
            icon: '🚕',
            bookingMethod: 'counter',
            pickupLocation: 'Taxi Counter'
        },
        {
            id: '3',
            type: 'shuttle',
            name: 'Hotel Shuttle',
            description: 'Shared ride service',
            priceRange: {
                min: 300,
                max: 300,
                currency: '₱'
            },
            estimatedDuration: 45,
            availability: 'limited',
            features: ['Most affordable', 'Door-to-door', 'Scheduled departures', 'Shared ride'],
            icon: '🚌',
            bookingMethod: 'counter',
            pickupLocation: 'Shuttle Stand'
        },
        {
            id: '4',
            type: 'private',
            name: 'Private Car Service',
            description: 'Premium comfort',
            priceRange: {
                min: 800,
                max: 1200,
                currency: '₱'
            },
            estimatedDuration: 30,
            availability: 'available',
            features: ['Premium vehicle', 'Professional driver', 'Meet & greet', 'Luggage assist'],
            icon: '🚙',
            bookingMethod: 'online',
            pickupLocation: 'VIP Lounge Exit'
        }
    ];

    const getAvailabilityColor = (availability: string) => {
        switch (availability) {
            case 'available':
                return 'text-green-600 bg-green-100';
            case 'limited':
                return 'text-orange-600 bg-orange-100';
            case 'unavailable':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getAvailabilityText = (availability: string) => {
        switch (availability) {
            case 'available':
                return 'Available Now';
            case 'limited':
                return 'Limited Availability';
            case 'unavailable':
                return 'Unavailable';
            default:
                return availability;
        }
    };

    const handleSelectOption = (option: TransportationOption) => {
        setSelectedOption(option);
    };

    const handleBook = () => {
        if (selectedOption) {
            setShowConfirmModal(true);
        }
    };

    const confirmBooking = () => {
        setShowConfirmModal(false);
        // Navigate to route tracking screen
        onNavigate('route-tracking');
    };

    return (
        <div className="h-full min-h-screen bg-gradient-to-br from-orange-50/10 via-white to-orange-50/30 overflow-y-auto pb-32 relative">
            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 left-10 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header - Warm Yellow/Orange for Arrival */}
            <div className={`fixed top-0 w-full z-20 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white px-6 pt-6 pb-8 shadow-xl transition-all duration-300 ease-out ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                }`}>
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => onNavigate('destination-input')}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Back to Destinations</span>
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                            <Car size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Choose Your Ride</h1>
                            <p className="text-orange-100 text-sm">Compare options and book your transport</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 mt-6 pt-36">
                {/* Destination Info Banner */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin size={16} className="text-teal-600" />
                            <span className="text-sm text-gray-600">Going to</span>
                        </div>
                        <p className="font-bold text-gray-900">Radisson Blu Cebu</p>
                        <p className="text-sm text-gray-600">Serging Osmeña Blvd, Cebu City • 12.5 km away</p>
                    </div>
                </div>

                {/* Transportation Options */}
                <div className={`space-y-4 transition-all duration-300 ease-out delay-150 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap size={20} className="text-teal-600" />
                        Available Transportation
                    </h2>

                    {transportOptions.map((option, index) => {
                        const isSelected = selectedOption?.id === option.id;
                        const isRecommended = option.type === 'grab'; // Recommend Grab as default

                        return (
                            <GlassCard
                                key={option.id}
                                className={`p-5 cursor-pointer transition-all hover:shadow-lg relative overflow-hidden ${isSelected ? 'ring-2 ring-red-500 ring-offset-2 bg-red-50/30' : ''
                                    }`}
                                onClick={() => handleSelectOption(option)}
                            >
                                {/* Recommended Badge */}
                                {isRecommended && (
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star size={12} fill="white" />
                                        <span>Recommended</span>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${isSelected ? 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {option.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg mb-1">{option.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                                            </div>
                                        </div>

                                        {/* Price & Time */}
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex items-center gap-1 text-red-700 font-bold">
                                                <DollarSign size={16} />
                                                <span>
                                                    {option.priceRange.currency}{option.priceRange.min}
                                                    {option.priceRange.min !== option.priceRange.max && `-${option.priceRange.max}`}
                                                </span>
                                            </div>
                                            <span className="text-gray-400">•</span>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Clock size={16} />
                                                <span className="text-sm">{option.estimatedDuration} min</span>
                                            </div>
                                        </div>

                                        {/* Availability */}
                                        <div className="mb-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(option.availability)}`}>
                                                <div className="w-2 h-2 rounded-full bg-current"></div>
                                                {getAvailabilityText(option.availability)}
                                            </span>
                                        </div>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2">
                                            {option.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Pickup Location */}
                                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                                            <MapPin size={12} />
                                            <span>Pickup: {option.pickupLocation}</span>
                                        </div>
                                    </div>

                                    {/* Selection Indicator */}
                                    {isSelected && (
                                        <div className="flex-shrink-0">
                                            <div className="bg-red-500 rounded-full p-1.5">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* Helpful Tips */}
                <div className={`mt-6 transition-all duration-300 ease-out delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Travel Tips
                        </h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Traffic is typically lighter before 7AM and after 8PM</li>
                            <li>• Mactan-Mandaue Bridge is the main route to Cebu City</li>
                            <li>• Have exact change ready for metered taxis</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom CTA */}
            {selectedOption && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl animate-slide-up">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Selected Option</p>
                                <p className="font-bold text-gray-900">{selectedOption.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Estimated Cost</p>
                                <p className="font-bold text-orange-700 text-xl">
                                    {selectedOption.priceRange.currency}{selectedOption.priceRange.min}
                                    {selectedOption.priceRange.min !== selectedOption.priceRange.max && `-${selectedOption.priceRange.max}`}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleBook}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-shadow flex items-center justify-center gap-3"
                        >
                            <span className="text-lg">
                                {selectedOption.bookingMethod === 'app' ? 'Open Grab App' :
                                    selectedOption.bookingMethod === 'call' ? 'Call to Book' :
                                        'Go to Counter'}
                            </span>
                            <ArrowRight size={20} />
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-2">
                            Pickup at {selectedOption.pickupLocation} • ETA: {selectedOption.estimatedDuration} min
                        </p>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && selectedOption && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20">
                        <h2 className="text-2xl font-black text-gray-900 mb-6 text-center tracking-tight">Confirm Your Booking</h2>

                        <div className="bg-[#FFF9F0] border border-orange-100 rounded-2xl p-5 mb-6 shadow-inner">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="text-4xl bg-white p-2 rounded-xl shadow-sm border border-orange-100">{selectedOption.icon}</div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{selectedOption.name}</h3>
                                    <p className="text-sm text-gray-500">{selectedOption.description}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-500 font-medium">Estimated Cost:</span>
                                    <span className="font-bold text-red-600 text-lg">
                                        {selectedOption.priceRange.currency}{selectedOption.priceRange.min}
                                        {selectedOption.priceRange.min !== selectedOption.priceRange.max && `-${selectedOption.priceRange.max}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-500 font-medium">Pickup Location:</span>
                                    <span className="font-bold text-gray-900">{selectedOption.pickupLocation}</span>
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-gray-500 font-medium">Estimated Time:</span>
                                    <span className="font-bold text-gray-900">{selectedOption.estimatedDuration} min</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mb-8 text-center font-medium">
                            Are you sure you want to proceed with this booking?
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="flex-1 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default TransportationOptionsScreen;
