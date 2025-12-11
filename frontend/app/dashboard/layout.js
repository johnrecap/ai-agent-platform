'use client';

/**
 * User Dashboard Layout
 * AI Agent Hosting Platform
 */

import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}
