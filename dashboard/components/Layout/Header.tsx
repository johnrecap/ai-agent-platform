import React from 'react';
import { Search, Bell, Plus, Gift, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-20 transition-colors duration-200">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:text-white transition-colors" 
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <span className="text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-600 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-500 shadow-sm">⌘ F</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Toggle Theme"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Gift size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Plus size={20} />
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;