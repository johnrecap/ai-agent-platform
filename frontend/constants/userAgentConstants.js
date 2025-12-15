/**
 * User Agent Assignment Constants
 * Configuration for agent assignment features
 */

export const ASSIGNMENT_STATUSES = [
    { value: 'assigned', label: 'Assigned', color: 'green' },
    { value: 'unassigned', label: 'Not Assigned', color: 'gray' }
];

export const MAX_AGENTS_PER_USER = 50; // Maximum agents per user

export const ASSIGNMENT_TYPES = [
    { value: 'owner', label: 'Owner', icon: '👑' },
    { value: 'assigned', label: 'Assigned', icon: '🔗' }
];
