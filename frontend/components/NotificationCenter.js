'use client';

/**
 * Notification Center
 * AI Agent Platform - Premium 2026 Design
 */

import { useState, useEffect, createContext, useContext } from 'react';
import { GradientButton } from '@/components/ui';

// Demo notifications
const DEMO_NOTIFICATIONS = [
    { id: 1, type: 'success', title: 'Upload Complete', message: '50 conversations imported successfully', time: '2m ago', read: false },
    { id: 2, type: 'info', title: 'New User', message: 'John Doe joined the platform', time: '1h ago', read: false },
    { id: 3, type: 'warning', title: 'Storage Warning', message: 'You are using 80% of your storage', time: '3h ago', read: true },
    { id: 4, type: 'agent', title: 'Agent Active', message: 'Sales Bot is now online', time: '1d ago', read: true },
];

// Context
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = (notification) => {
        setNotifications(prev => [
            { id: Date.now(), time: 'Just now', read: false, ...notification },
            ...prev
        ]);
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const value = {
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        return {
            notifications: [],
            unreadCount: 0,
            isOpen: false,
            setIsOpen: () => { },
            addNotification: () => { },
            markAsRead: () => { },
            markAllAsRead: () => { },
            clearAll: () => { },
        };
    }
    return context;
}

// Notification Bell Component
export function NotificationBell({ className = '' }) {
    const { unreadCount, setIsOpen } = useNotifications();

    return (
        <button
            onClick={() => setIsOpen(true)}
            className={`relative p-2 rounded-xl hover:bg-[var(--bg-card)] transition-colors ${className}`}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        >
            <span className="text-xl">🔔</span>
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </button>
    );
}

// Notification Panel Component
export function NotificationPanel() {
    const { notifications, isOpen, setIsOpen, markAsRead, markAllAsRead, clearAll, unreadCount } = useNotifications();

    if (!isOpen) return null;

    const getTypeIcon = (type) => {
        const icons = {
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌',
            agent: '🤖',
        };
        return icons[type] || '📢';
    };

    const getTypeColor = (type) => {
        const colors = {
            success: 'bg-green-500/20 border-green-500/30',
            info: 'bg-blue-500/20 border-blue-500/30',
            warning: 'bg-yellow-500/20 border-yellow-500/30',
            error: 'bg-red-500/20 border-red-500/30',
            agent: 'bg-purple-500/20 border-purple-500/30',
        };
        return colors[type] || 'bg-gray-500/20 border-gray-500/30';
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[999]"
                onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] z-[1000] animate-fadeInDown">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-[var(--border-primary)] flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-[var(--text-primary)]">Notifications</h2>
                            {unreadCount > 0 && (
                                <p className="text-xs text-[var(--text-secondary)]">{unreadCount} unread</p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-purple-400 hover:text-purple-300"
                                >
                                    Mark all read
                                </button>
                            )}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <span className="text-4xl mb-2 block">🔔</span>
                                <p className="text-[var(--text-secondary)]">No notifications</p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`
                                        p-4 border-b border-[var(--border-primary)] cursor-pointer
                                        hover:bg-[var(--bg-card)] transition-colors
                                        ${!notification.read ? 'bg-purple-500/5' : ''}
                                    `}
                                >
                                    <div className="flex gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${getTypeColor(notification.type)}`}>
                                            {getTypeIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className={`font-medium text-sm ${!notification.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                    {notification.title}
                                                </h3>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-1.5" />
                                                )}
                                            </div>
                                            <p className="text-xs text-[var(--text-tertiary)] line-clamp-2 mt-0.5">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-[var(--text-muted)] mt-1">
                                                {notification.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-[var(--border-primary)]">
                            <button
                                onClick={clearAll}
                                className="w-full text-center text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                            >
                                Clear all notifications
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default NotificationPanel;
