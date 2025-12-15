/**
 * Automation Utilities
 * Helper functions for automation
 */

/**
 * Get automation status color
 * @param {string} status - Automation status
 * @returns {string} Tailwind color class
 */
export const getAutomationStatusColor = (status) => {
    const colors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return colors[status] || colors.inactive;
};

/**
 * Format execution count
 * @param {number} count - Execution count
 * @returns {string} Formatted count
 */
export const formatExecutionCount = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
};

/**
 * Validate automation rule
 * @param {object} data - Automation rule data
 * @returns {object} Validation result
 */
export const validateAutomationRule = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters';
    }

    if (!data.trigger || !data.trigger.type) {
        errors.trigger = 'Trigger is required';
    }

    if (!data.actions || data.actions.length === 0) {
        errors.actions = 'At least one action is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Format last executed time
 * @param {string} date - Date string
 * @returns {string} Formatted time ago
 */
export const formatLastExecuted = (date) => {
    if (!date) return 'Never';

    const now = new Date();
    const lastExec = new Date(date);
    const diffMs = now - lastExec;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};
