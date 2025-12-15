/**
 * Dashboard Utilities
 * Helper functions for Dashboard components
 */

/**
 * Check if dark mode is active
 * @returns {boolean}
 */
export const isDarkMode = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Get chart theme colors based on dark mode
 * @param {boolean} isDark - Is dark mode active
 * @returns {object} Theme colors
 */
export const getChartTheme = (isDark) => ({
    gridColor: isDark ? '#374151' : '#f1f5f9',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipText: isDark ? '#f3f4f6' : '#1f2937',
    axisColor: '#94a3b8',
    cursorFill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
});

/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = '$') => {
    return `${currency} ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
};

/**
 * Export data to CSV
 * @param {Array} data - Data array to export
 * @param {string} filename - Output filename
 */
export const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0] || {});
    const csvContent = 'data:text/csv;charset=utf-8,' +
        headers.join(',') + '\n' +
        data.map(row => headers.map(header => row[header]).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
