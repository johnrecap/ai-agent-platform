/**
 * Advanced Analytics Locales
 * All text content for Advanced Analytics module
 */

export const advancedAnalyticsLocales = {
    en: {
        // Page
        pageTitle: 'Advanced Analytics',
        pageSubtitle: 'Comprehensive insights and reports',

        // Time Periods
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly',

        // Metrics
        revenue: 'Revenue',
        customers: 'Customers',
        products: 'Products',
        invoices: 'Invoices',
        growth: 'Growth',

        // Chart Labels
        revenueChart: 'Revenue Analytics',
        customerGrowth: 'Customer Growth',
        topProducts: 'Top Products',
        paymentMethods: 'Payment Methods Distribution',

        // Actions
        export: 'Export',
        filter: 'Filter',
        refresh: 'Refresh',
        selectPeriod: 'Select Period',

        // Summary
        totalRevenue: 'Total Revenue',
        totalCustomers: 'Total Customers',
        totalProducts: 'Total Products',
        pendingInvoices: 'Pending Invoices',

        // Messages
        noDataAvailable: 'No data available',
        loadingData: 'Loading analytics data...',
        exportSuccess: 'Data exported successfully',

        // Time
        today: 'Today',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        thisYear: 'This Year',

        // Tooltips
        viewDetails: 'View details',
        downloadReport: 'Download report'
    }
};

export const getAdvancedAnalyticsText = (key, lang = 'en') => {
    return advancedAnalyticsLocales[lang]?.[key] || key;
};
