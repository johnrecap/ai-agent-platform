/**
 * Agent Input Validator
 * AI Agent Hosting Platform
 */

/**
 * Validate agent creation input
 * @param {Object} data - Agent data
 * @returns {Object} Validation result
 */
const validateCreateAgent = (data) => {
    const errors = [];
    const { agent_name, iframe_code, dify_api_key } = data;

    if (!agent_name || agent_name.trim().length === 0) {
        errors.push('Agent name is required');
    } else if (agent_name.length < 3) {
        errors.push('Agent name must be at least 3 characters');
    }

    if (!iframe_code && !dify_api_key) {
        errors.push('Either iframe_code or dify_api_key is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate agent update input
 * @param {Object} data - Agent update data
 * @returns {Object} Validation result
 */
const validateUpdateAgent = (data) => {
    const errors = [];
    const { agent_name, page_url } = data;

    if (agent_name !== undefined) {
        if (!agent_name || agent_name.trim().length === 0) {
            errors.push('Agent name cannot be empty');
        } else if (agent_name.length < 3) {
            errors.push('Agent name must be at least 3 characters');
        }
    }

    if (page_url !== undefined) {
        if (!page_url || page_url.trim().length === 0) {
            errors.push('Page URL cannot be empty');
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateCreateAgent,
    validateUpdateAgent
};
