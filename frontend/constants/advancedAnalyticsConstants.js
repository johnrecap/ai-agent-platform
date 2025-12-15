/**
 * Advanced Analytics Constants
 * Chart configurations and time periods
 */

export const TIME_PERIODS = [
    { value: 'day', label: 'Daily' },
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'year', label: 'Yearly' }
];

export const CHART_TYPES = [
    { value: 'line', label: 'Line Chart', icon: '📈' },
    { value: 'bar', label: 'Bar Chart', icon: '📊' },
    { value: 'pie', label: 'Pie Chart', icon: '🥧' },
    { value: 'area', label: 'Area Chart', icon: '📉' }
];

export const ANALYTICS_METRICS = [
    { key: 'revenue', label: 'Revenue', color: '#3b82f6' },
    { key: 'customers', label: 'Customers', color: '#10b981' },
    { key: 'products', label: 'Products', color: '#f59e0b' },
    { key: 'invoices', label: 'Invoices', color: '#ef4444' }
];

export const DEFAULT_CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false
        }
    }
};
