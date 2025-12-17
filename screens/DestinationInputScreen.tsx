
import React, { useState, useEffect } from 'react';
import { ScreenId, DestinationInfo, CebuRegion } from '../types';
import { Search, MapPin, Building2, Palmtree, Navigation, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Props {
    onNavigate: (screen: ScreenId) => void;
}

const DestinationInputScreen: React.FC<Props> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<CebuRegion | 'All'>('All');
    const [selectedDestination, setSelectedDestination] = useState<DestinationInfo | null>(null);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    // Mock popular destinations data
    const popularDestinations: DestinationInfo[] = [
        {
            name: 'Shangri-La Mactan Resort & Spa',
            address: 'Punta Engaño Road, Lapu-Lapu City',
            region: 'Lapu-Lapu City',
            type: 'resort',
            distanceFromAirport: 4.2,
            estimatedTravelTime: 15,
            coordinates: { lat: 10.3157, lng: 124.0451 }
        },
        {
            name: 'Radisson Blu Cebu',
            address: 'Serging Osmeña Blvd, Cebu City',
            region: 'Cebu City',
            type: 'hotel',
            distanceFromAirport: 12.5,
            estimatedTravelTime: 35,
            coordinates: { lat: 10.3181, lng: 123.8934 }
        },
        {
            name: 'Waterfront Cebu City Hotel & Casino',
            address: 'Salinas Drive, Lahug, Cebu City',
            region: 'Cebu City',
            type: 'hotel',
            distanceFromAirport: 13.8,
            estimatedTravelTime: 40,
            coordinates: { lat: 10.3225, lng: 123.8963 }
        },
        {
            name: 'Crimson Resort & Spa',
            address: 'Seascapes Resort Town, Lapu-Lapu City',
            region: 'Lapu-Lapu City',
            type: 'resort',
            distanceFromAirport: 8.1,
            estimatedTravelTime: 22,
            coordinates: { lat: 10.2989, lng: 124.0123 }
        },
        {
            name: 'Marco Polo Plaza Cebu',
            address: 'Nivel Hills, Cebu City',
            region: 'Cebu City',
            type: 'hotel',
            distanceFromAirport: 15.2,
            estimatedTravelTime: 45,
            coordinates: { lat: 10.3321, lng: 123.9102 }
        },
        {
            name: 'Dusit Thani Mactan',
            address: 'Punta Engaño, Lapu-Lapu City',
            region: 'Lapu-Lapu City',
            type: 'resort',
            distanceFromAirport: 5.6,
            estimatedTravelTime: 18,
            coordinates: { lat: 10.3089, lng: 124.0389 }
        }
    ];

    const regions: Array<CebuRegion | 'All'> = ['All', 'Lapu-Lapu City', 'Cebu City', 'Mandaue City'];

    const filteredDestinations = popularDestinations.filter(dest => {
        const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.address.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRegion && matchesSearch;
    });

    const handleDestinationSelect = (destination: DestinationInfo) => {
        setSelectedDestination(destination);
        // Navigate to transportation options with selected destination
        // For now, we'll just show it's selected
    };

    const handleContinue = () => {
        if (selectedDestination) {
            onNavigate('transportation-options');
        }
    };

    return (
        <div className="h-full min-h-screen bg-gradient-to-br from-orange-50/10 via-white to-orange-50/30 overflow-y-auto pb-32 relative">
            {/* Decorative Background Pattern */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-200/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 left-10 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header - Warm Yellow/Orange for Arrival */}
            <div className={`bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white px-6 pt-6 pb-8 shadow-xl transition-all duration-300 ease-out relative z-10 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
                }`}>
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={() => onNavigate('arrival-dashboard')}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-sm font-medium">Back to Timeline</span>
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                            <MapPin size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">Where are you headed?</h1>
                            <p className="text-orange-100 text-sm">Select your destination in Cebu</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 mt-6">
                {/* Search Bar */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-100 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search hotels, resorts, or addresses..."
                            className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Region Filter */}
                <div className={`mb-6 transition-all duration-300 ease-out delay-150 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {regions.map((region) => (
                            <button
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all shadow-sm ${selectedRegion === region
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/30'
                                    : 'bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200'
                                    }`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Popular Destinations */}
                <div className={`transition-all duration-300 ease-out delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Building2 size={20} className="text-orange-600" />
                        Popular Destinations
                    </h2>

                    {filteredDestinations.length === 0 ? (
                        <div className="text-center py-12">
                            <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500">No destinations found</p>
                            <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredDestinations.map((destination, index) => {
                                const isSelected = selectedDestination?.name === destination.name;
                                const Icon = destination.type === 'resort' ? Palmtree : Building2;

                                return (
                                    <GlassCard
                                        key={index}
                                        className={`p-4 cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-orange-500 ring-offset-2 bg-orange-50/30' : ''
                                            }`}
                                        onClick={() => handleDestinationSelect(destination)}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                <Icon size={24} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 mb-1">
                                                    {destination.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {destination.address}
                                                </p>

                                                {/* Distance & Time */}
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Navigation size={12} />
                                                        {destination.distanceFromAirport} km
                                                    </span>
                                                    <span>•</span>
                                                    <span>{destination.estimatedTravelTime} min drive</span>
                                                </div>
                                            </div>

                                            {/* Selection Indicator */}
                                            {isSelected && (
                                                <div className="flex-shrink-0">
                                                    <div className="bg-orange-600 rounded-full p-1">
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
                    )}
                </div>

                {/* Custom Address Option */}
                <div className={`mt-6 transition-all duration-300 ease-out delay-250 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}>
                    <button
                        className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all"
                        onClick={() => {/* Handle custom address input */ }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <MapPin size={20} />
                            <span className="font-semibold">Enter Custom Address</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Fixed Bottom CTA */}
            {selectedDestination && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg animate-slide-up">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm text-gray-600">Selected Destination</p>
                                <p className="font-bold text-gray-900">{selectedDestination.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Travel Time</p>
                                <p className="font-bold text-orange-700">{selectedDestination.estimatedTravelTime} min</p>
                            </div>
                        </div>
                        <button
                            onClick={handleContinue}
                            className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                        >
                            <span className="text-lg">View Transportation Options</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
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

export default DestinationInputScreen;
