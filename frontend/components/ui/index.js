'use client';

/**
 * Core UI Components
 * AI Agent Platform - Premium 2026 Design
 */

import { forwardRef } from 'react';

// ============================================
// Glass Card Component
// ============================================
export const GlassCard = forwardRef(({
    children,
    className = '',
    hover = true,
    glow = false,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={`
      bg-[var(--bg-card)] 
      border border-[var(--border-primary)] 
      rounded-2xl 
      ${hover ? 'hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-secondary)] transition-all duration-300' : ''}
      ${glow ? 'shadow-[0_0_40px_var(--primary-glow)]' : ''}
      ${className}
    `}
        {...props}
    >
        {children}
    </div>
));
GlassCard.displayName = 'GlassCard';

// ============================================
// Gradient Button Component
// ============================================
export const GradientButton = forwardRef(({
    children,
    variant = 'primary', // primary, secondary, ghost, danger
    size = 'md', // sm, md, lg
    loading = false,
    disabled = false,
    className = '',
    ...props
}, ref) => {
    const variants = {
        primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/25',
        secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-secondary)] hover:bg-[var(--bg-card-hover)]',
        ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
        danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600',
        success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-lg',
        md: 'px-4 py-2.5 text-base rounded-xl',
        lg: 'px-6 py-3.5 text-lg rounded-xl',
    };

    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={`
        font-semibold 
        transition-all duration-200 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                </span>
            ) : children}
        </button>
    );
});
GradientButton.displayName = 'GradientButton';

// ============================================
// Skeleton Loader
// ============================================
export const Skeleton = ({
    className = '',
    variant = 'text', // text, circular, rectangular
    width,
    height,
}) => {
    const baseClass = 'animate-pulse bg-gradient-to-r from-[var(--bg-tertiary)] via-[var(--bg-card-hover)] to-[var(--bg-tertiary)] bg-[length:200%_100%]';

    const variants = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    };

    return (
        <div
            className={`${baseClass} ${variants[variant]} ${className}`}
            style={{ width, height }}
            role="status"
            aria-label="Loading..."
        />
    );
};

// ============================================
// Empty State
// ============================================
export const EmptyState = ({
    icon = '📭',
    title = 'No data found',
    description,
    action,
    actionLabel = 'Get Started',
    onAction,
}) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
        <div className="text-7xl mb-6 animate-float">{icon}</div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
        {description && (
            <p className="text-[var(--text-secondary)] max-w-md mb-6">{description}</p>
        )}
        {action && (
            <GradientButton onClick={onAction}>{actionLabel}</GradientButton>
        )}
    </div>
);

// ============================================
// Error State
// ============================================
export const ErrorState = ({
    title = 'Something went wrong',
    description = 'Please try again later',
    onRetry,
    retryLabel = 'Try Again',
}) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
        <div className="text-7xl mb-6">❌</div>
        <h3 className="text-xl font-semibold text-[var(--error)] mb-2">{title}</h3>
        <p className="text-[var(--text-secondary)] max-w-md mb-6">{description}</p>
        {onRetry && (
            <GradientButton variant="secondary" onClick={onRetry}>{retryLabel}</GradientButton>
        )}
    </div>
);

// ============================================
// Status Badge
// ============================================
export const StatusBadge = ({
    status = 'default', // online, offline, busy, away
    label,
    size = 'md',
}) => {
    const colors = {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
        default: 'bg-purple-500',
    };

    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
    };

    return (
        <span className="inline-flex items-center gap-2">
            <span className={`${sizes[size]} ${colors[status]} rounded-full ${status === 'online' ? 'animate-pulse' : ''}`} />
            {label && <span className="text-sm text-[var(--text-secondary)]">{label}</span>}
        </span>
    );
};

// ============================================
// Loading Spinner
// ============================================
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    return (
        <div
            className={`${sizes[size]} border-purple-500 border-t-transparent rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        />
    );
};

// ============================================
// Page Loader
// ============================================
export const PageLoader = ({ text = 'Loading...' }) => (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-4">
        <Spinner size="xl" />
        <p className="text-[var(--text-secondary)] animate-pulse">{text}</p>
    </div>
);

// ============================================
// Icon Button
// ============================================
export const IconButton = forwardRef(({
    children,
    size = 'md',
    variant = 'ghost',
    className = '',
    ...props
}, ref) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const variants = {
        ghost: 'hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
        filled: 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)]',
        danger: 'hover:bg-red-500/20 text-red-400 hover:text-red-500',
    };

    return (
        <button
            ref={ref}
            className={`
        ${sizes[size]} 
        ${variants[variant]}
        rounded-xl 
        flex items-center justify-center 
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
});
IconButton.displayName = 'IconButton';

// ============================================
// Tooltip (Simple)
// ============================================
export const Tooltip = ({ children, content, position = 'top' }) => {
    const positions = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div className="relative group inline-block">
            {children}
            <div className={`
        absolute ${positions[position]}
        px-2 py-1 
        bg-[var(--bg-tertiary)] 
        text-[var(--text-primary)] 
        text-sm rounded-lg
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none
        whitespace-nowrap
        z-50
      `}>
                {content}
            </div>
        </div>
    );
};

export default {
    GlassCard,
    GradientButton,
    Skeleton,
    EmptyState,
    ErrorState,
    StatusBadge,
    Spinner,
    PageLoader,
    IconButton,
    Tooltip,
};
