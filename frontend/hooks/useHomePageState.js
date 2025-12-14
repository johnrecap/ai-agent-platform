'use client';

import { useState, useEffect } from 'react';
import { isLoggedIn, isAdmin, getUser } from '@/lib/auth';
import { useLanguage } from '@/lib/language';
import { roleContent } from '@/constants/home/roleContent';

/**
 * Custom hook for Homepage state management
 * Manages user state, language, role switching, and scroll state
 */
export function useHomePageState() {
    const { isRTL } = useLanguage();
    const [loggedIn] = useState(() => isLoggedIn());
    const [userIsAdmin] = useState(() => isAdmin());
    const [user] = useState(() => getUser());
    const [activeRole, setActiveRole] = useState('startup');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll for header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get current role content
    const content = roleContent[activeRole];

    // Get role-specific text
    const getRoleText = (key) => {
        const suffix = isRTL ? '_ar' : '_en';
        return content[key + suffix] || content[key];
    };

    return {
        loggedIn,
        userIsAdmin,
        user,
        activeRole,
        setActiveRole,
        isScrolled,
        content,
        getRoleText
    };
}
