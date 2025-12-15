import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Command, LogOut } from 'lucide-react';
import { SIDEBAR_MENU } from '../../constants/navigation';
import { CONFIG } from '../../constants/config';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleUpgrade = () => {
    window.open(CONFIG.STRIPE_PAYMENT_LINK, '_blank');
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col fixed left-0 top-0 overflow-y-auto z-10 transition-colors duration-200">
      {/* Logo */}
      <Link to="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <Command size={18} />
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">Nexus</span>
      </Link>

      {/* User Mini Profile */}
      <div className="px-6 pb-2 mb-2">
         <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
             <img src={user?.avatar || "https://picsum.photos/50"} alt="User" className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600" />
             <div className="min-w-0">
                 <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
             </div>
         </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-8">
        {SIDEBAR_MENU.map((section, idx) => {
          const visibleItems = section.items.filter(item => 
            !item.role || (user && user.role === item.role)
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4 px-2">{section.category}</h3>
              <ul className="space-y-1">
                {visibleItems.map((item, itemIdx) => (
                  <SidebarItem 
                    key={itemIdx} 
                    item={item} 
                    isActive={location.pathname === item.path} 
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto space-y-3">
        {user?.role === 'user' && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                    <Command size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Free Plan</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Upgrade</p>
                  </div>
              </div>
              <button 
                  onClick={handleUpgrade}
                  className="w-full bg-white dark:bg-gray-800 text-xs font-semibold py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                  Upgrade Plan
              </button>
            </div>
        )}
        <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/20"
        >
            <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;