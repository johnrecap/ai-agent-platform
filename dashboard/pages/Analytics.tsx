import React, { useState } from 'react';
import { BarChart2, PieChart, TrendingUp, Activity, Download, Calendar, ChevronDown } from 'lucide-react';
import SalesOverview from '../components/Dashboard/SalesOverview';
import SubscriberChart from '../components/Dashboard/SubscriberChart';
import { weeklySalesData, monthlySalesData, subscriberData } from '../constants/mockData';
import { generateCSV } from '../lib/utils';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'Weekly' | 'Monthly'>('Weekly');
  const [isExporting, setIsExporting] = useState(false);

  // Toggle data based on selection
  const chartData = timeRange === 'Weekly' ? weeklySalesData : monthlySalesData;

  const handleExport = () => {
    setIsExporting(true);
    // Simulate generation delay for better UX
    setTimeout(() => {
        const headers = ['Period', 'China', 'UAE', 'USA', 'Canada', 'Other'];
        const rows = chartData.map(d => [d.name, d.China, d.UAE, d.USA, d.Canada, d.Other]);
        generateCSV(headers, rows, `analytics_report_${timeRange.toLowerCase()}.csv`);
        setIsExporting(false);
    }, 800);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track key performance indicators and growth metrics.</p>
          </div>
          
          <div className="flex items-center gap-3">
              <div className="relative group">
                  <button className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                      <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                      {timeRange} View
                      <ChevronDown size={14} className="text-gray-400" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-1 hidden group-hover:block z-10 animate-in fade-in zoom-in duration-200">
                      <button onClick={() => setTimeRange('Weekly')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${timeRange === 'Weekly' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                          Weekly
                      </button>
                      <button onClick={() => setTimeRange('Monthly')} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${timeRange === 'Monthly' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                          Monthly
                      </button>
                  </div>
              </div>

              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  <Download size={16} />
                  {isExporting ? 'Exporting...' : 'Export Report'}
              </button>
          </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            icon={<Activity size={20} />} 
            title="Active Sessions" 
            value="4,321" 
            color="indigo"
          />
          <MetricCard 
            icon={<TrendingUp size={20} />} 
            title="Conversion Rate" 
            value="2.4%" 
            color="emerald"
          />
          <MetricCard 
            icon={<BarChart2 size={20} />} 
            title="Avg. Order Value" 
            value="$85.20" 
            color="blue"
          />
           <MetricCard 
            icon={<PieChart size={20} />} 
            title="Retention" 
            value="88%" 
            color="purple"
          />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto min-h-[400px]">
         <div className="h-[400px]">
             <SalesOverview data={chartData} />
         </div>
         <div className="h-[400px]">
             <SubscriberChart data={subscriberData} />
         </div>
      </div>
    </div>
  );
};

// Sub-component for clean reusable cards
const MetricCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => {
    const colorClasses: Record<string, string> = {
        indigo: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
        blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-default group">
             <div className={`flex items-center gap-3 mb-4 text-gray-500 dark:text-gray-400`}>
                 <div className={`p-2.5 rounded-lg ${colorClasses[color] || colorClasses.indigo} group-hover:scale-110 transition-transform duration-200`}>
                    {icon}
                 </div>
                 <span className="font-medium text-sm">{title}</span>
             </div>
             <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
             <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                <TrendingUp size={12} /> +12.5% from last month
             </p>
          </div>
    )
}

export default Analytics;