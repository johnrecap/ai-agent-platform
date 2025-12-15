/**
 * Products Utilities
 * Helper functions for products management
 */

/**
 * Format price to currency
 * @param {number} price - Price value
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
};

/**
 * Get status badge color
 * @param {string} status - Product status
 * @returns {string} Tailwind color class
 */
export const getStatusColor = (status) => {
    const colors = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        archived: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.inactive;
};

/**
 * Validate product form data
 * @param {object} data - Product data
 * @returns {object} Validation result { isValid, errors }
 */
export const validateProduct = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 3) {
        errors.name = 'Product name must be at least 3 characters';
    }

    if (!data.price || parseFloat(data.price) <= 0) {
        errors.price = 'Price must be greater than 0';
    }

    if (data.stock_quantity && parseInt(data.stock_quantity) < 0) {
        errors.stock_quantity = 'Stock quantity cannot be negative';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Filter products by search query
 * @param {array} products - Products array
 * @param {string} query - Search query
 * @returns {array} Filtered products
 */
export const filterProducts = (products, query) => {
    if (!query) return products;

    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) ||
        product.category?.toLowerCase().includes(lowerQuery)
    );
};
