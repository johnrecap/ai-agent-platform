'use client';

/**
 * Dashboard Redirect
 * Redirects to /profile for consistency
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/profile');
    }, [router]);

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[var(--text-secondary)]">Redirecting...</p>
            </div>
        </div>
    );
}
