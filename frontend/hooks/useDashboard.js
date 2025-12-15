'use client';

/**
 * useDashboard Hook
 * State management for the new dashboard
 */

import { useState } from 'react';
import { monthlySalesData, weeklySalesData, dailySalesData } from '@/constants/newDashboardData';

/**
 * Generate CSV and download
 */
const generateCSV = (headers, rows, filename) => {
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const useDashboard = () => {
    const [period, setPeriod] = useState('Monthly');
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState('Oct 18 - Nov 18');

    // Logic to switch data based on period
    const currentSalesData =
        period === 'Monthly' ? monthlySalesData :
            period === 'Weekly' ? weeklySalesData :
                dailySalesData;

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    const toggleFilters = () => setShowFilters(!showFilters);
    const closeFilters = () => setShowFilters(false);

    const cycleDateRange = () => {
        const ranges = ['Oct 18 - Nov 18', 'Nov 19 - Dec 19', 'Dec 20 - Jan 20'];
        const currentIndex = ranges.indexOf(dateRange);
        setDateRange(ranges[(currentIndex + 1) % ranges.length]);
    };

    const handleExport = () => {
        const headers = ['Period', 'China', 'UAE', 'USA', 'Canada', 'Other'];
        const rows = currentSalesData.map(d => [d.name, d.China, d.UAE, d.USA, d.Canada, d.Other]);
        generateCSV(headers, rows, `sales_report_${period.toLowerCase()}.csv`);
    };

    return {
        period,
        showFilters,
        dateRange,
        currentSalesData,
        handlePeriodChange,
        toggleFilters,
        closeFilters,
        cycleDateRange,
        handleExport
    };
};
