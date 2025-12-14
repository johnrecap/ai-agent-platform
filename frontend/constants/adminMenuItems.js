/**
 * Admin Menu Items Configuration
 * Defines all sidebar navigation items with icons and translations
 */

export const ADMIN_MENU_ITEMS = [
    {
        icon: '🏠',
        labelKey: 'admin.dashboard',
        href: '/admin',
        exact: true
    },
    {
        icon: '👥',
        labelKey: 'admin.users',
        href: '/admin/users'
    },
    {
        icon: '🤖',
        labelKey: 'admin.agents',
        href: '/admin/agents'
    },
    {
        icon: '✨',
        labelKey: 'admin.agentMaker',
        href: '/admin/agent-maker'
    },
    {
        icon: '💬',
        labelKey: 'conversations.title',
        href: '/admin/conversations'
    },
    {
        icon: '🗑️',
        labelKey: 'admin.trash',
        href: '/admin/trash'
    },
    {
        icon: '📊',
        labelKey: 'admin.analytics',
        href: '/admin/analytics'
    },
    {
        icon: '⚙️',
        labelKey: 'settings.title',
        href: '/admin/settings'
    }
];
