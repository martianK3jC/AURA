import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string, duration = 5000) => {
        const id = Date.now().toString();
        const newToast: Toast = { id, type, message, duration };

        setToasts(prev => [...prev, newToast]);

        // Auto-dismiss after longer duration
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const getToastStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-500',
                    icon: <CheckCircle size={20} className="text-white" />,
                    border: 'border-green-600'
                };
            case 'error':
                return {
                    bg: 'bg-red-500',
                    icon: <XCircle size={20} className="text-white" />,
                    border: 'border-red-600'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-500',
                    icon: <AlertTriangle size={20} className="text-white" />,
                    border: 'border-yellow-600'
                };
            case 'info':
                return {
                    bg: 'bg-blue-500',
                    icon: <Info size={20} className="text-white" />,
                    border: 'border-blue-600'
                };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container - More Prominent */}
            <div className="fixed top-6 right-6 z-[10000] space-y-3 pointer-events-none">
                {toasts.map((toast, index) => {
                    const styles = getToastStyles(toast.type);
                    return (
                        <div
                            key={toast.id}
                            className={`${styles.bg} ${styles.border} border-2 rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 min-w-[350px] max-w-[450px] pointer-events-auto animate-in slide-in-from-right-8 fade-in zoom-in duration-500 hover:scale-105 transition-transform`}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                boxShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset'
                            }}
                        >
                            {/* Icon with Pulse Animation */}
                            <div className="shrink-0 relative">
                                <div className="absolute inset-0 animate-ping opacity-50">
                                    {styles.icon}
                                </div>
                                <div className="relative">
                                    {styles.icon}
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-white text-base font-semibold flex-1 leading-snug">
                                {toast.message}
                            </p>

                            {/* Close Button */}
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="shrink-0 hover:bg-white/20 rounded-full p-1.5 transition-colors active:scale-90"
                                aria-label="Close notification"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};
