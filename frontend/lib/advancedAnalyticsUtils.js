/**
 * Advanced Analytics Utilities
 * Data transformation and helper functions
 */

/**
 * Transform API data for chart display
 * @param {array} data - Raw API data
 * @param {string} labelKey - Key for labels
 * @param {string} valueKey - Key for values
 * @returns {object} Transformed data
 */
export const transformChartData = (data, labelKey = 'period', valueKey = 'revenue') => {
    if (!data || !Array.isArray(data)) return { labels: [], datasets: [] };

    const labels = data.map(item => {
        if (item[labelKey] instanceof Date) {
            return item[labelKey].toLocaleDateString();
        }
        return item[labelKey] || 'N/A';
    });

    const values = data.map(item => parseFloat(item[valueKey]) || 0);

    return {
        labels,
        datasets: [{
            label: valueKey.charAt(0).toUpperCase() + valueKey.slice(1),
            data: values,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
};

/**
 * Format large numbers (K, M, B)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * Calculate percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
};

/**
 * Get chart color by index
 * @param {number} index - Color index
 * @returns {string} Color hex code
 */
export const getChartColor = (index) => {
    const colors = [
        '#3b82f6', // blue
        '#10b981', // green
        '#f59e0b', // orange
        '#ef4444', // red
        '#8b5cf6', // purple
        '#ec4899', // pink
        '#06b6d4', // cyan
        '#84cc16'  // lime
    ];
    return colors[index % colors.length];
};

/**
 * Export data to CSV
 * @param {array} data - Data to export
 * @param {string} filename - File name
 */
export const exportAnalyticsToCSV = (data, filename = 'analytics') => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
};
