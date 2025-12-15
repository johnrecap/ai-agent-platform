'use client';

/**
 * SalesDistribution Component
 * Semi-donut chart showing sales distribution by channel
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Wallet, ChevronDown } from 'lucide-react';
import { salesDistributionData } from '@/constants/newDashboardData';

const SalesDistribution = () => {
    // Check for dark mode
    const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

    // Adjust colors dynamically based on theme
    const data = salesDistributionData.map(item => ({
        ...item,
        color: item.name === 'Other' && isDark ? '#4b5563' : item.color
    }));

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-colors duration-200">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                        <Wallet size={16} />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 dark:text-white">Sales Distribution</h3>
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    Monthly <ChevronDown size={14} />
                </button>
            </div>

            {/* Legend Top */}
            <div className="flex justify-between items-center mb-8 px-2">
                {data.map((item, index) => (
                    <div key={index} className="text-center">
                        <div className="flex items-center gap-1.5 justify-center mb-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.name}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">${item.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesDistribution;
