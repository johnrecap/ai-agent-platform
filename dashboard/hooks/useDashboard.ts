import React, { useState } from 'react';
import { generateCSV } from '../lib/utils';
import { monthlySalesData, weeklySalesData, dailySalesData } from '../constants/mockData';

export const useDashboard = () => {
  const [period, setPeriod] = useState<string>('Monthly');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>('Oct 18 - Nov 18');

  // Logic to switch data based on period
  const currentSalesData = 
    period === 'Monthly' ? monthlySalesData : 
    period === 'Weekly' ? weeklySalesData : 
    dailySalesData;

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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