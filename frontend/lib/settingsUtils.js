/**
 * Settings Utilities
 * Helper functions for settings management
 */

/**
 * Group settings by category
 * @param {array} settings - Settings array
 * @returns {object} Grouped settings
 */
export const groupSettingsByCategory = (settings) => {
    return settings.reduce((acc, setting) => {
        if (!acc[setting.category]) {
            acc[setting.category] = [];
        }
        acc[setting.category].push(setting);
        return acc;
    }, {});
};

/**
 * Get setting value by key
 * @param {array} settings - Settings array
 * @param {string} category - Category
 * @param {string} key - Setting key
 * @param {any} defaultValue - Default value
 * @returns {any} Setting value
 */
export const getSettingValue = (settings, category, key, defaultValue = null) => {
    const setting = settings.find(s => s.category === category && s.key === key);
    return setting ? setting.value : defaultValue;
};

/**
 * Validate setting value
 * @param {string} category - Category
 * @param {string} key - Setting key
 * @param {any} value - Setting value
 * @returns {boolean} Is valid
 */
export const validateSettingValue = (category, key, value) => {
    // Basic validation
    if (value === null || value === undefined) return false;

    // Category-specific validation
    if (category === 'security') {
        if (key === 'session_timeout' && value < 5) return false;
        if (key === 'password_expiry' && value < 1) return false;
    }

    return true;
};
