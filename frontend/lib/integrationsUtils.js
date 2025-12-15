/**
 * Integrations Utilities
 * Helper functions for integrations
 */

/**
 * Get integration type color
 * @param {string} type - Integration type
 * @returns {string} Tailwind color class
 */
export const getIntegrationTypeColor = (type) => {
    const colors = {
        stripe: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        zapier: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        slack: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        webhook: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        api: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        custom: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[type] || colors.custom;
};

/**
 * Get integration status color
 * @param {string} status - Integration status
 * @returns {string} Tailwind color class
 */
export const getIntegrationStatusColor = (status) => {
    const colors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.inactive;
};

/**
 * Validate integration config
 * @param {object} data - Integration data
 * @returns {object} Validation result
 */
export const validateIntegration = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!data.type) {
        errors.type = 'Integration type is required';
    }

    if (data.type === 'webhook' && !data.webhook_url) {
        errors.webhook_url = 'Webhook URL is required';
    }

    if ((data.type === 'stripe' || data.type === 'slack') && !data.api_key) {
        errors.api_key = 'API Key is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Format last sync time
 * @param {string} date - Date string
 * @returns {string} Formatted time ago
 */
export const formatLastSync = (date) => {
    if (!date) return 'Never';

    const now = new Date();
    const lastSync = new Date(date);
    const diffMs = now - lastSync;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};
