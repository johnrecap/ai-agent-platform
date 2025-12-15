import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img 
          src={user?.avatar || "https://picsum.photos/100/100"} 
          alt="User" 
          className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
        />
        <div className="hidden md:block">
          <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.name || 'Guest'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role || 'Viewer'}</p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">My Account</p>
          </div>
          <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsOpen(false)}>
            <User size={16} /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => setIsOpen(false)}>
            <SettingsIcon size={16} /> Settings
          </Link>
          <div className="border-t border-gray-50 dark:border-gray-700 mt-1">
            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;