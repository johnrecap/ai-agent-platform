import React from 'react';
import { Eye, DollarSign, Activity } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import SalesOverview from '../components/Dashboard/SalesOverview';
import SubscriberChart from '../components/Dashboard/SubscriberChart';
import SalesDistribution from '../components/Dashboard/SalesDistribution';
import IntegrationsList from '../components/Dashboard/IntegrationsList';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import { useDashboard } from '../hooks/useDashboard';
import { subscriberData } from '../constants/mockData';

const Dashboard = () => {
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
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      
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
};

export default Dashboard;