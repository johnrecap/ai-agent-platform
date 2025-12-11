'use client';

/**
 * Protected Route Component
 * AI Agent Hosting Platform
 * 
 * Wraps pages that require authentication
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn, isAdmin, getCurrentUser } from '@/lib/auth';
import { PageLoader } from './LoadingSpinner';

export default function ProtectedRoute({
    children,
    requireAdmin = false
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        // Check if logged in
        if (!isLoggedIn()) {
            router.push('/login');
            return;
        }

        // Check admin requirement
        if (requireAdmin && !isAdmin()) {
            router.push('/dashboard');
            return;
        }

        setAuthorized(true);
        setLoading(false);
    };

    if (loading) {
        return <PageLoader text="Checking authorization..." />;
    }

    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}

// HOC version for wrapping entire pages
export function withAuth(Component, options = {}) {
    return function AuthenticatedComponent(props) {
        return (
            <ProtectedRoute {...options}>
                <Component {...props} />
            </ProtectedRoute>
        );
    };
}
