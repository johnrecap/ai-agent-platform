/**
 * Security Locales
 * All text content for Security module
 */

export const securityLocales = {
    en: {
        // Page
        pageTitle: 'Security Dashboard',
        pageSubtitle: 'Monitor activity and security events',

        // Stats
        totalLogs: 'Total Logs',
        criticalEvents: 'Critical Events',
        warningEvents: 'Warning Events',
        todayActivity: "Today's Activity",

        // Severity
        info: 'Info',
        warning: 'Warning',
        error: 'Error',
        critical: 'Critical',

        // Actions
        login: 'Login',
        logout: 'Logout',
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        access: 'Access',

        // Table
        timestamp: 'Timestamp',
        user: 'User',
        action: 'Action',
        entity: 'Entity',
        severity: 'Severity',
        ipAddress: 'IP Address',
        details: 'Details',

        // Filters
        filterBySeverity: 'Filter by Severity',
        filterByAction: 'Filter by Action',
        allSeverities: 'All Severities',
        allActions: 'All Actions',

        // Messages
        noLogs: 'No activity logs yet',

        // Labels
        unknown: 'Unknown',
        system: 'System'
    }
};

export const getSecurityText = (key, lang = 'en') => {
    return securityLocales[lang]?.[key] || key;
};
