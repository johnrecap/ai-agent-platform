/**
 * Dify Utilities
 * Helper functions for Dify integration
 */

/**
 * Validate Dify API Key format
 * @param {string} key - API Key
 * @returns {boolean}
 */
export const validateDifyApiKey = (key) => {
    if (!key || typeof key !== 'string') return false;
    return key.length >= 20 && key.length <= 500;
};

/**
 * Format Dify configuration
 * @param {object} config - Configuration object
 * @returns {object}
 */
export const formatDifyConfig = (config) => {
    return {
        apiKey: config.dify_api_key || '',
        appId: config.dify_app_id || '',
        providerType: config.provider_type || 'custom',
        providerConfig: config.provider_config || {}
    };
};

/**
 * Parse sync response
 * @param {object} response - API response
 * @returns {object}
 */
export const parseSyncResponse = (response) => {
    if (!response || !response.data) {
        return { synced: 0, success: false };
    }

    return {
        synced: response.data.synced || 0,
        success: response.success || false,
        message: response.message || ''
    };
};

/**
 * Get status color
 * @param {boolean} configured - Configuration status
 * @returns {string}
 */
export const getStatusColor = (configured) => {
    return configured
        ? 'bg-green-500/20 text-green-400 border-green-500/30'
        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
};

/**
 * Get provider icon
 * @param {string} providerType - Provider type
 * @returns {string}
 */
export const getProviderIcon = (providerType) => {
    const icons = {
        dify: '🤖',
        openai: '🧠',
        custom: '⚙️'
    };
    return icons[providerType] || '⚙️';
};
