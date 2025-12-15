'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Breadcrumbs Component - Reusable!
 * Shows navigation breadcrumb trail
 */
const Breadcrumbs = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {index > 0 && (
                            <span className="text-[var(--text-tertiary)]">→</span>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                            >
                                {item.icon && <span className="mr-1">{item.icon}</span>}
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-[var(--text-secondary)]">
                                {item.icon && <span className="mr-1">{item.icon}</span>}
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
