'use client';

/**
 * Admin Dashboard - New Premium Design
 * AI Agent Platform
 * Integrated from Nexus AI Dashboard
 */

import { Eye, DollarSign, Activity } from 'lucide-react';
import {
    StatsCard,
    SalesOverview,
    SubscriberChart,
    SalesDistribution,
    IntegrationsList,
    DashboardHeader
} from '@/components/NewDashboard';
import { useDashboard } from '@/hooks/useDashboard';
import { subscriberData } from '@/constants/newDashboardData';

export default function AdminDashboard() {
    const {
        period,
        showFilters,
        dateRange,
        currentSalesData,
        handlePeriodChange,
        toggleFilters,
        closeFilters,
        cycleDateRange,
        handleExport
    } = useDashboard();

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-6 bg-[#f9fafb] dark:bg-gray-900 min-h-screen">

            <DashboardHeader
                dateRange={dateRange}
                period={period}
                showFilters={showFilters}
                onDateClick={cycleDateRange}
                onPeriodChange={handlePeriodChange}
                onFilterToggle={toggleFilters}
                onFilterClose={closeFilters}
                onExport={handleExport}
            />

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Page Views"
                    value="12,450"
                    change="15.8%"
                    isPositive={true}
                    icon={<Eye size={18} />}
                />
                <StatsCard
                    title="Total Revenue"
                    value="$ 363.95"
                    change="34.0%"
                    isPositive={false}
                    icon={<DollarSign size={18} />}
                />
                <StatsCard
                    title="Bounce Rate"
                    value="86.5%"
                    change="24.2%"
                    isPositive={true}
                    icon={<Activity size={18} />}
                />
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[420px]">
                <div className="lg:col-span-8 h-full">
                    <SalesOverview data={currentSalesData} />
                </div>
                <div className="lg:col-span-4 h-full">
                    <SubscriberChart data={subscriberData} />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[350px]">
                <div className="lg:col-span-4 h-full">
                    <SalesDistribution />
                </div>
                <div className="lg:col-span-8 h-full">
                    <IntegrationsList />
                </div>
            </div>
        </div>
    );
}
