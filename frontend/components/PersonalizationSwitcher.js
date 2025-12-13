'use client';

/**
 * Personalization Switcher
 * "I'm a..." role selector that changes content
 */

import { useState } from 'react';
import { Briefcase, Users, Code } from 'lucide-react';
import { useLanguage } from '@/lib/language';

export default function PersonalizationSwitcher({ onChange }) {
    const [activeRole, setActiveRole] = useState('startup');
    const { isRTL } = useLanguage();

    const roles = [
        {
            id: 'startup',
            label: 'Startup',
            labelAr: 'شركة ناشئة',
            icon: Briefcase
        },
        {
            id: 'agency',
            label: 'Agency',
            labelAr: 'وكالة',
            icon: Users
        },
        {
            id: 'solo',
            label: 'Solo Dev',
            labelAr: 'مطور فردي',
            icon: Code
        }
    ];

    const handleRoleChange = (roleId) => {
        setActiveRole(roleId);
        if (onChange) onChange(roleId);
    };

    return (
        <div className="inline-flex items-center gap-2 p-1 bg-[var(--role-surface)] border border-[var(--role-border)] rounded-xl">
            {roles.map((role) => {
                const Icon = role.icon;
                const isActive = activeRole === role.id;

                return (
                    <button
                        key={role.id}
                        onClick={() => handleRoleChange(role.id)}
                        className={`
              px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-[var(--motion-ui-duration)]
              flex items-center gap-2
              ${isActive
                                ? 'bg-[var(--role-accent)] text-white shadow-[var(--elevation-2)]'
                                : 'text-[var(--role-text-secondary)] hover:text-[var(--role-text-primary)] hover:bg-[var(--role-surface-elevated)]'
                            }
            `}
                        aria-pressed={isActive}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{isRTL ? role.labelAr : role.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
