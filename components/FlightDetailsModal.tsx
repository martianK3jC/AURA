import React from 'react';
import { X, Plane, Clock, MapPin, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { TravelerContext } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    flightNumber: string;
    isDelayed: boolean;
    travelerContext?: TravelerContext;
}

const FlightDetailsModal: React.FC<Props> = ({ isOpen, onClose, flightNumber, isDelayed, travelerContext }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scale-up">

                {/* Header Image/Gradient */}
                <div className={`h-32 ${isDelayed ? 'bg-gradient-to-br from-red-600 to-orange-600' : 'bg-gradient-to-br from-emerald-600 to-teal-600'} relative p-6 flex justify-between items-start`}>
                    <div className="text-white">
                        <h2 className="text-3xl font-black tracking-tighter">{flightNumber}</h2>
                        <p className="font-medium opacity-90">Cebu Pacfic Air</p>
                    </div>
                    <button onClick={onClose} className="bg-black/20 hover:bg-black/30 text-white rounded-full p-2 transition-colors">
                        <X size={20} />
                    </button>

                    <div className="absolute -bottom-6 right-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl">
                        ✈️
                    </div>
                </div>

                {/* content */}
                <div className="pt-8 px-6 pb-6">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 ${isDelayed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {isDelayed ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                        {isDelayed ? 'Delayed (+45m)' : 'On Time'}
                    </div>

                    {/* Route */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">CEB</div>
                            <div className="text-xs text-gray-500 font-medium uppercase">Cebu</div>
                        </div>
                        <div className="flex-1 px-4 flex flex-col items-center">
                            <div className="text-xs text-gray-400 mb-1">1h 45m</div>
                            <div className="w-full h-0.5 bg-gray-200 relative">
                                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 bg-white border-2 ${isDelayed ? 'border-red-500' : 'border-emerald-500'}`}>
                                    <Plane size={12} className={`transform rotate-90 ${isDelayed ? 'text-red-500' : 'text-emerald-500'}`} />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">MNL</div>
                            <div className="text-xs text-gray-500 font-medium uppercase">Manila</div>
                        </div>
                    </div>

                    {/* Grid Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <Clock size={14} />
                                <span className="text-xs font-bold uppercase">Boarding</span>
                            </div>
                            <div className={`text-xl font-bold ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}>
                                {isDelayed ? '14:45' : '13:30'}
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <MapPin size={14} />
                                <span className="text-xs font-bold uppercase">Gate</span>
                            </div>
                            <div className={`text-xl font-bold ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}>
                                {isDelayed ? '12A' : '05'}
                            </div>
                        </div>
                    </div>

                    {/* AI Insight */}
                    <div className={`p-4 rounded-xl mb-6 ${isDelayed ? 'bg-red-50 text-red-900 border border-red-100' : 'bg-blue-50 text-blue-900 border border-blue-100'}`}>
                        <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                            ✨ AI Flight Insight
                        </h4>
                        <p className="text-xs opacity-90 leading-relaxed">
                            {isDelayed
                                ? "Incoming aircraft from Davao arrived late due to weather. Gate changed to 12A to expedite turnaround."
                                : "Aircraft has landed and is at the gate. Boarding expected to start exactly on time."}
                        </p>
                    </div>

                    <button onClick={onClose} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailsModal;
