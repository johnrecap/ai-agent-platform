'use client';

/**
 * Navbar Component
 * AI Agent Hosting Platform
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout, isAdmin } from '@/lib/auth';

export default function Navbar() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setUser(getCurrentUser());
    }, []);

    const handleLogout = () => {
        logout();
    };

    // Don't show navbar on login page
    if (pathname === '/login') return null;

    return (
        <nav className="bg-white shadow-lg border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl">🤖</span>
                            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                AI Agent Platform
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/'
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>

                        {user ? (
                            <>
                                {isAdmin() && (
                                    <Link
                                        href="/admin"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith('/admin')
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Admin Panel
                                    </Link>
                                )}

                                <Link
                                    href="/profile"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === '/profile' || pathname.startsWith('/profile')
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    Profile
                                </Link>

                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        👤 {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden py-3 border-t border-gray-100">
                        <Link href="/" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                            Home
                        </Link>
                        {user ? (
                            <>
                                {isAdmin() && (
                                    <Link href="/admin" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                                        Admin Panel
                                    </Link>
                                )}
                                <Link href="/profile" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
