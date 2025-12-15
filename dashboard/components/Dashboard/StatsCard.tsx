import React from 'react';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCardProps } from '../../types';

const StatsCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            {icon}
            <span className="text-sm font-medium">{title}</span>
        </div>
        <Info size={16} className="text-gray-300 dark:text-gray-600 cursor-help" />
      </div>
      
      <div className="flex items-end gap-3">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md mb-1 ${
          isPositive 
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
            : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;