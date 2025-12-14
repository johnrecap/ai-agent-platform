'use client';

import { useAdminSidebar } from '@/hooks/admin/useAdminSidebar';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

/**
 * Admin Sidebar Component
 * Responsive sidebar with desktop and mobile views
 * 
 * Features:
 * - Desktop: Collapsible sidebar with full navigation
 * - Mobile: Header + bottom navigation bar
 * - Automatic responsive switching
 * - Multi-language support
 */
export default function AdminSidebar() {
    const {
        language,
        collapsed,
        setCollapsed,
        isMobile,
        handleLogout,
        toggleLanguage,
        isActive
    } = useAdminSidebar();

    // Render mobile or desktop version
    if (isMobile) {
        return (
            <MobileSidebar
                handleLogout={handleLogout}
                toggleLanguage={toggleLanguage}
                language={language}
                isActive={isActive}
            />
        );
    }

    return (
        <DesktopSidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isActive={isActive}
            handleLogout={handleLogout}
            toggleLanguage={toggleLanguage}
            language={language}
        />
    );
}
