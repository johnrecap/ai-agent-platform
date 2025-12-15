'use client';

/**
 * DashboardHeader Component
 * Header with date range selector, period switcher, filters, and export
 */

import { Calendar, Filter, Download, X } from 'lucide-react';

const DashboardHeader = ({
    dateRange,
    period,
    showFilters,
    onDateClick,
    onPeriodChange,
    onFilterToggle,
    onFilterClose,
    onExport
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={onDateClick}
                        className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all"
                    >
                        <Calendar size={16} className="text-gray-400" />
                        <span>{dateRange}</span>
                    </button>

                    <select
                        value={period}
                        onChange={onPeriodChange}
                        className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 shadow-sm focus:outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                    </select>

                    <button
                        onClick={onFilterToggle}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm shadow-sm transition-colors ${showFilters
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <Filter size={16} /> Filter
                    </button>

                    <button
                        onClick={onExport}
                        className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all"
                    >
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-fadeIn">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Filter Analytics</h3>
                        <button onClick={onFilterClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900">
                            <option>All Regions</option>
                            <option>North America</option>
                            <option>Europe</option>
                        </select>
                        <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900">
                            <option>All Products</option>
                            <option>Premium Plan</option>
                        </select>
                        <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900">
                            <option>Status: Active</option>
                            <option>Status: Pending</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHeader;
