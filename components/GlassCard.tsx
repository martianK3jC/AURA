import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    /**
     * Visual variant following Tropical Modern design system
     * - default: Clean white card with subtle shadow
     * - elevated: White card with stronger shadow
     * - highlight: Warm orange-to-yellow gradient background
     * - success: Green tinted background
     * - warning: Amber tinted background
     * - error: Red tinted background
     */
    variant?: 'default' | 'elevated' | 'highlight' | 'success' | 'warning' | 'error';
    onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    variant = 'default',
    onClick
}) => {
    const isClickable = !!onClick;

    const variants = {
        // True Glass Effect - Semi-transparent white with blur
        default: 'bg-white/70 backdrop-blur-xl border-white/50 border shadow-lg shadow-neutral-500/5 hover:bg-white/80',
        elevated: 'bg-white/80 backdrop-blur-2xl border-white/60 border shadow-xl shadow-neutral-500/10',

        // Warm highlight (for current/active states) - Solid with glow
        highlight: 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300 shadow-lg shadow-orange-500/20',

        // Semantic states - Solid backgrounds for clarity
        success: 'bg-emerald-50 border-emerald-300 shadow-md shadow-emerald-500/15',
        warning: 'bg-amber-50 border-amber-300 shadow-md shadow-amber-500/15',
        error: 'bg-red-50 border-red-300 shadow-md shadow-red-500/15',
    };

    return (
        <div
            className={`
        ${variants[variant]}
        border
        rounded-2xl
        transition-all
        duration-300
        ease-out
        backdrop-blur-xl
        ${isClickable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : ''}
        ${className}
      `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassCard;
