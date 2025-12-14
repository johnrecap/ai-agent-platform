import Link from 'next/link';

/**
 * Sidebar Menu Item Component
 * Individual navigation item with active state and translations
 */
export default function SidebarMenuItem({ item, isActive, t, collapsed = false }) {
    return (
        <Link
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                    ? 'bg-[var(--accent)] text-white shadow-lg'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                }`}
        >
            <span className={`text-xl ${collapsed ? 'mx-auto' : ''}`}>
                {item.icon}
            </span>
            {!collapsed && (
                <span className="font-medium text-sm">
                    {t(item.labelKey)}
                </span>
            )}
        </Link>
    );
}
