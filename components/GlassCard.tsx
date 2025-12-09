import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'highlight' | 'critical' | 'dark';
    onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    variant = 'default',
    onClick
}) => {
    const baseStyles = "relative overflow-hidden backdrop-blur-xl transition-all duration-300 border";

    const variants = {
        default: "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20",
        highlight: "bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.1)]",
        critical: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
        dark: "bg-slate-950/40 border-white/5 hover:bg-slate-950/60"
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassCard;
