import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, MessageCircle, MapPin, Clock, AlertCircle } from 'lucide-react';

interface Message {
    id: number;
    type: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

interface TravelerChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

const TravelerChatbot: React.FC<TravelerChatbotProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: 'ai',
            text: "Welcome to Cebu! ☀️ I'm AURA, your personal travel assistant. I can help you with wait times, finding restaurants, or checking flight connections. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (userQuery: string): string => {
        const query = userQuery.toLowerCase();

        // Connection/Flight queries
        if (query.includes('miss') || query.includes('connection') || query.includes('flight') || query.includes('late')) {
            return "Based on your current location (Immigration) and average wait times:\n\n**Don't worry! You have plenty of time.** 🕒\n\n• **Your Next Flight:** 5J 456 to Davao (Departing 5:30 PM)\n• **Boarding Starts:** 4:45 PM\n• **Time Remaining:** 2 hours 15 mins\n• **Estimated Processing:** 25 mins total\n\nYou will likely be at your gate by **3:45 PM**, giving you ~1 hour to relax or eat.";
        }

        // Wait time queries
        if (query.includes('wait') || query.includes('long') || query.includes('queue') || query.includes('line')) {
            return "**Current Wait Times (Live):**\n\n🛂 **Immigration:** ~8 minutes (42 people)\n🛄 **Baggage Claim:** ~12 minutes (Belt 3)\n🚕 **Taxi Queue:** ~5 minutes\n\nPro Tip: The left side of Immigration usually moves 30% faster right now! 😉";
        }

        // Food/Amenity queries
        if (query.includes('jollibee') || query.includes('food') || query.includes('eat') || query.includes('coffee') || query.includes('hungry')) {
            return "**Hungry? Here are the best spots nearby:**\n\n🍗 **Jollibee:** 3 min walk (Arrivals Hall outside)\n☕ **Starbucks:** 5 min walk (Near Taxi Bay)\n🍜 **Ramen Doha:** 10 min walk (Terminal 2 Link)\n\n**Recommendation:** Jollibee currently has no line! Would you like me to show you the way?";
        }

        // Taxi/Transport queries
        if (query.includes('taxi') || query.includes('grab') || query.includes('bus') || query.includes('ride')) {
            return "**Transportation Options:**\n\n🚗 **Grab:** ~450 PHP (3 min wait)\n🚕 **White Taxi:** ~300 PHP (5 min wait)\n🚌 **MyBus:** 50 PHP (Next bus: 3:15 PM)\n\nI recommend **Grab** for the most comfortable ride to Cebu City at this hour.";
        }

        // Fallback response
        return "I can help with:\n\n• \"Will I miss my connection?\"\n• \"Where is Jollibee?\"\n• \"How long is the taxi line?\"\n• \"Where is the restroom?\"\n\nWhat do you need?";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            type: 'user',
            text: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking + respond
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                type: 'ai',
                text: getAIResponse(input),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[550px] flex flex-col overflow-hidden animate-slide-up">
                {/* Header - Warm Arrival Theme */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">AURA Concierge</h3>
                            <p className="text-white/90 text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                Online • Multilingual
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            {msg.type === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                                    <Sparkles size={14} className="text-white" />
                                </div>
                            )}

                            {/* Message */}
                            <div className={`max-w-[80%] ${msg.type === 'ai'
                                ? 'bg-white border border-gray-100 shadow-sm text-gray-800'
                                : 'bg-gradient-to-br from-orange-500 to-red-500 shadow-md text-white'
                                } rounded-2xl p-3.5 ${msg.type === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                                <p className="text-sm whitespace-pre-line leading-relaxed">
                                    {msg.text}
                                </p>
                                <span className={`text-[10px] mt-1.5 block ${msg.type === 'ai' ? 'text-gray-400' : 'text-white/70'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shrink-0">
                                <Sparkles size={14} className="text-white" />
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3.5 flex gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask AURA..."
                            className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={20} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelerChatbot;
