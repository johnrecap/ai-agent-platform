'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useLanguage } from '@/lib/language';

/**
 * Custom hook for AdminSidebar state management
 * Handles responsive behavior, navigation, and user actions
 */
export function useAdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { language, setLanguage } = useLanguage();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setMobileOpen(false);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle logout
    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    // Toggle language
    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    // Check if menu item is active
    const isActive = (item) => {
        if (item.exact) return pathname === item.href;
        return pathname.startsWith(item.href);
    };

    return {
        pathname,
        language,
        collapsed,
        setCollapsed,
        isMobile,
        mobileOpen,
        setMobileOpen,
        handleLogout,
        toggleLanguage,
        isActive
    };
}
