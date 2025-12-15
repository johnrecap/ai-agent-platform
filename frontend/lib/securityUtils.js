/**
 * Security Utilities
 * Helper functions for security features
 */

/**
 * Get severity color
 * @param {string} severity - Log severity
 * @returns {string} Tailwind color class
 */
export const getSeverityColor = (severity) => {
    const colors = {
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        critical: 'bg-red-200 text-red-900 dark:bg-red-800/50 dark:text-red-300'
    };
    return colors[severity] || colors.info;
};

/**
 * Format IP address
 * @param {string} ip - IP address
 * @returns {string} Formatted IP
 */
export const formatIPAddress = (ip) => {
    if (!ip) return 'Unknown';
    return ip.replace('::ffff:', '');
};

/**
 * Parse user agent string
 * @param {string} userAgent - User agent string
 * @returns {object} Parsed info
 */
export const parseUserAgent = (userAgent) => {
    if (!userAgent) return { browser: 'Unknown', os: 'Unknown' };

    const browser = userAgent.includes('Chrome') ? 'Chrome' :
        userAgent.includes('Firefox') ? 'Firefox' :
            userAgent.includes('Safari') ? 'Safari' : 'Unknown';

    const os = userAgent.includes('Windows') ? 'Windows' :
        userAgent.includes('Mac') ? 'MacOS' :
            userAgent.includes('Linux') ? 'Linux' : 'Unknown';

    return { browser, os };
};
