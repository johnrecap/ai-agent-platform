'use client';

/**
 * Loading Spinner Component
 * AI Agent Hosting Platform
 */

export default function LoadingSpinner({ size = 'md', text = '' }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
            />
            {text && (
                <p className="text-sm text-gray-500 animate-pulse">{text}</p>
            )}
        </div>
    );
}

// Full page loading spinner
export function PageLoader({ text = 'Loading...' }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <LoadingSpinner size="lg" text={text} />
        </div>
    );
}
