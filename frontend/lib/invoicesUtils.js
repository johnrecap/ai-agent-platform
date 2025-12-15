/**
 * Invoices Utilities
 * Helper functions for invoices management
 */

/**
 * Format date to readable string
 * @param {string} date - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Format currency
 * @param {number} amount - Amount value
 * @returns {string} Formatted currency
 */
export const formatInvoiceCurrency = (amount) => {
    return `$${parseFloat(amount || 0).toFixed(2)}`;
};

/**
 * Get invoice status badge color
 * @param {string} status - Invoice status
 * @returns {string} Tailwind color class
 */
export const getInvoiceStatusColor = (status) => {
    const colors = {
        draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        cancelled: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return colors[status] || colors.draft;
};

/**
 * Get payment status badge color
 * @param {string} status - Payment status
 * @returns {string} Tailwind color class
 */
export const getPaymentStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        refunded: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return colors[status] || colors.pending;
};

/**
 * Calculate invoice totals
 * @param {array} items - Invoice items
 * @param {number} taxRate - Tax rate percentage
 * @returns {object} Calculated totals
 */
export const calculateInvoiceTotals = (items, taxRate = 0) => {
    const subtotal = items.reduce((sum, item) => {
        return sum + (item.quantity * item.unit_price);
    }, 0);

    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return {
        subtotal: subtotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        total: total.toFixed(2)
    };
};

/**
 * Validate invoice form data
 * @param {object} data - Invoice data
 * @returns {object} Validation result
 */
export const validateInvoice = (data) => {
    const errors = {};

    if (!data.invoice_number || data.invoice_number.trim().length < 3) {
        errors.invoice_number = 'Invoice number must be at least 3 characters';
    }

    if (!data.customer_id) {
        errors.customer_id = 'Customer is required';
    }

    if (!data.items || data.items.length === 0) {
        errors.items = 'At least one item is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
