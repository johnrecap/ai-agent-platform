'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { TrendingUpIcon } from './ChartIcons';
import { isDarkMode, getChartTheme } from '@/lib/dashboardUtils';
import { CHART_CONFIG } from '@/constants/chartConstants';

const SalesOverview = ({ data }) => {
    const isDark = isDarkMode();
    const theme = getChartTheme(isDark);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-colors duration-200">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-md">
                            <ArrowUpDown size={14} className="text-gray-600 dark:text-gray-300" />
                        </span>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Sales Overview</h3>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">$ 9,257.51</h2>
                        <span className="text-sm text-emerald-500 font-medium flex items-center gap-1">
                            15.8% <TrendingUpIcon />
                            <span className="text-gray-400 dark:text-gray-500 ml-1">+$143.50 increased</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <ArrowUpDown size={14} /> Sort
                    </button>
                    <button className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-gray-400">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={CHART_CONFIG.margin} barSize={CHART_CONFIG.barSize}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.gridColor} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme.axisColor, fontSize: CHART_CONFIG.axis.fontSize }}
                            dy={CHART_CONFIG.axis.dy}
                        />
                        <YAxis hide={true} />
                        <Tooltip
                            cursor={{ fill: theme.cursorFill }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                backgroundColor: theme.tooltipBg,
                                color: theme.tooltipText
                            }}
                        />
                        <Legend
                            iconType="circle"
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{value}</span>}
                        />
                        <Bar dataKey="China" stackId="a" fill="#6366f1" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="UAE" stackId="a" fill="#818cf8" />
                        <Bar dataKey="USA" stackId="a" fill="#a5b4fc" />
                        <Bar dataKey="Canada" stackId="a" fill="#2dd4bf" />
                        <Bar dataKey="Other" stackId="a" fill={isDark ? '#4b5563' : '#ccfbf1'} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesOverview;
