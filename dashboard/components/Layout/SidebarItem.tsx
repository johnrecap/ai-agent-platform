import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types';

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isActive }) => {
  return (
    <li>
      <Link 
        to={item.path}
        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}>
            {item.icon}
          </span>
          {item.label}
        </div>
        {item.badge && (
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
            item.badge === 'BETA' 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' 
              : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300'
          }`}>
            {item.badge}
          </span>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;