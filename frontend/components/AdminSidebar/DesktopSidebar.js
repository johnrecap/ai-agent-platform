import { useLanguage } from '@/lib/language';
import SidebarMenuItem from './SidebarMenuItem';
import { ADMIN_MENU_ITEMS } from '@/constants/adminMenuItems';

/**
 * Desktop Sidebar Component
 * Full sidebar for desktop view with collapse functionality
 */
export default function DesktopSidebar({ collapsed, setCollapsed, isActive, handleLogout, toggleLanguage, language }) {
    const { t } = useLanguage();

    return (
        <aside
            className={`hidden lg:flex flex-col h-screen bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] sticky top-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-primary)]">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🤖</span>
                        <span className="font-bold text-[var(--text-primary)] text-sm">
                            {t('nav.aiAgentPlatform')}
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors"
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {ADMIN_MENU_ITEMS.map((item) => (
                    <SidebarMenuItem
                        key={item.href}
                        item={item}
                        isActive={isActive(item)}
                        t={t}
                        collapsed={collapsed}
                    />
                ))}
            </nav>

            {/* Footer Actions */}
            <div className={`p-4 border-t border-[var(--border-primary)] space-y-2 ${collapsed ? 'flex flex-col items-center' : ''}`}>
                <button
                    onClick={toggleLanguage}
                    className="w-full px-4 py-2 text-sm bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
                    title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                >
                    {collapsed ? (language === 'ar' ? 'EN' : 'ع') : (language === 'ar' ? 'English' : 'العربية')}
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm bg-[var(--error)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                    {!collapsed && t('common.logout')}
                    <span>🚪</span>
                </button>
            </div>
        </aside>
    );
}
