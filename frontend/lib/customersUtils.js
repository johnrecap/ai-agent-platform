/**
 * Customers Utilities
 * Helper functions for customers management
 */

/**
 * Format currency for total spent
 * @param {number} amount - Amount value
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
    return `$${parseFloat(amount || 0).toFixed(2)}`;
};

/**
 * Get status badge color
 * @param {string} status - Customer status
 * @returns {string} Tailwind color class
 */
export const getCustomerStatusColor = (status) => {
    const colors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        blocked: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.inactive;
};

/**
 * Get customer type badge color
 * @param {string} type - Customer type
 * @returns {string} Tailwind color class
 */
export const getCustomerTypeColor = (type) => {
    return type === 'business'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
};

/**
 * Validate customer form data
 * @param {object} data - Customer data
 * @returns {object} Validation result { isValid, errors }
 */
export const validateCustomer = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Valid email is required';
    }

    if (data.phone && data.phone.length > 0 && data.phone.length < 5) {
        errors.phone = 'Phone number must be at least 5 digits';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Filter customers by search query
 * @param {array} customers - Customers array
 * @param {string} query - Search query
 * @returns {array} Filtered customers
 */
export const filterCustomers = (customers, query) => {
    if (!query) return customers;

    const lowerQuery = query.toLowerCase();
    return customers.filter(customer =>
        customer.name.toLowerCase().includes(lowerQuery) ||
        customer.email?.toLowerCase().includes(lowerQuery) ||
        customer.company?.toLowerCase().includes(lowerQuery)
    );
};
