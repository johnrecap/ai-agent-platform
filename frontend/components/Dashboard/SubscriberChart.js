'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    ResponsiveContainer,
    Cell,
    Tooltip
} from 'recharts';
import { Users, ChevronDown } from 'lucide-react';
import { isDarkMode, getChartTheme } from '@/lib/dashboardUtils';

const SubscriberChart = ({ data }) => {
    const isDark = isDarkMode();
    const theme = getChartTheme(isDark);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-colors duration-200">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                        <Users size={16} />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 dark:text-white">Total Subscriber</h3>
                </div>

                <button className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    View Report <ChevronDown size={14} />
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">24,473</h2>
                <span className="text-sm text-emerald-500 font-medium flex items-center gap-1">
                    8.3% <span className="text-xs">↗</span>
                    <span className="text-gray-400 dark:text-gray-500 ml-1">+749 increased</span>
                </span>
            </div>

            <div className="flex-1 min-h-[200px] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center -mt-2">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Peak</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={32}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                backgroundColor: theme.tooltipBg,
                                color: theme.tooltipText
                            }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.value > 3000 ? '#6366f1' : (isDark ? '#374151' : '#f1f5f9')}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SubscriberChart;
