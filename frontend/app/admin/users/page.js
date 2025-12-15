'use client';

/**
 * Users Management Page with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { GlassCard, GradientButton, Skeleton, EmptyState, IconButton } from '@/components/ui';
import UserCard from '@/components/Users/UserCard';
import AgentAssignmentSection from '@/components/Users/AgentAssignmentSection';

export default function UsersPage() {
    const { t, isRTL, language } = useLanguage();
    const [users, setUsers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user', agentIds: [] });
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const txt = {
        title: language === 'ar' ? 'المستخدمين' : 'Users',
        subtitle: language === 'ar' ? 'إدارة مستخدمي المنصة' : 'Manage platform users',
        addUser: language === 'ar' ? '+ إضافة مستخدم' : '+ Add User',
        search: language === 'ar' ? 'بحث عن المستخدمين...' : 'Search users...',
        noUsers: language === 'ar' ? 'لم يتم العثور على مستخدمين' : 'No users found',
        tryDifferent: language === 'ar' ? 'جرب بحث مختلف' : 'Try different search',
        addFirst: language === 'ar' ? 'أضف أول مستخدم' : 'Add your first user',
        chats: language === 'ar' ? 'المحادثات' : 'Chats',
        editUser: language === 'ar' ? '✏️ تعديل المستخدم' : '✏️ Edit User',
        newUser: language === 'ar' ? '👤 مستخدم جديد' : '👤 New User',
        name: language === 'ar' ? 'الاسم' : 'Name',
        email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
        password: language === 'ar' ? 'كلمة المرور' : 'Password',
        keepBlank: language === 'ar' ? '(اتركها فارغة للإبقاء)' : '(leave blank to keep)',
        role: language === 'ar' ? 'الدور' : 'Role',
        user: language === 'ar' ? 'مستخدم' : 'User',
        admin: language === 'ar' ? 'مسؤول' : 'Admin',
        cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
        create: language === 'ar' ? 'إنشاء' : 'Create',
        update: language === 'ar' ? 'تحديث' : 'Update',
        deleteConfirm: language === 'ar' ? 'هل تريد حذف هذا المستخدم؟' : 'Delete this user?',
        userUpdated: language === 'ar' ? 'تم تحديث المستخدم!' : 'User updated!',
        userCreated: language === 'ar' ? 'تم إنشاء المستخدم!' : 'User created!',
        userDeleted: language === 'ar' ? 'تم حذف المستخدم' : 'User deleted',
        failed: language === 'ar' ? 'فشل' : 'Failed',
        assignedAgents: language === 'ar' ? 'البوتات المخصصة' : 'Assigned Agents',
        selectAgents: language === 'ar' ? 'اختر البوتات...' : 'Select agents...',
        noAgents: language === 'ar' ? 'لا توجد بوتات' : 'No agents',
    };

    useEffect(() => {
        loadUsers();
        loadAgents();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await api.get('/api/users?limit=100');
            setUsers(response.data.data || []);
        } catch (error) {
            toast.error(txt.failed);
        } finally {
            setLoading(false);
        }
    };

    const loadAgents = async () => {
        try {
            const response = await api.get('/api/agents?limit=100');
            setAgents(response.data.data || []);
        } catch (error) {
            console.error('Failed to load agents');
        }
    };

    const openModal = async (user = null) => {
        if (user) {
            setEditingUser(user);
            // Load assigned agents for this user
            let assignedAgentIds = [];
            try {
                const response = await api.get(`/api/user-agents/${user.id}`);
                assignedAgentIds = (response.data.data || []).map(a => a.id);
            } catch (e) {
                console.error('Failed to load user agents');
            }
            setFormData({ name: user.name, email: user.email, password: '', role: user.role, agentIds: assignedAgentIds });
        } else {
            setEditingUser(null);
            setFormData({ name: '', email: '', password: '', role: 'user', agentIds: [] });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { agentIds, ...userPayload } = formData;
            if (!userPayload.password) delete userPayload.password;

            let userId;
            if (editingUser) {
                await api.put(`/api/users/${editingUser.id}`, userPayload);
                userId = editingUser.id;
                toast.success(txt.userUpdated);
            } else {
                const response = await api.post('/api/users', userPayload);
                userId = response.data.data.id;
                toast.success(txt.userCreated);
            }

            // Assign agents to user
            if (userId && agentIds.length > 0) {
                await api.post(`/api/user-agents/${userId}`, { agentIds });
            } else if (userId && editingUser) {
                // Clear assignments if none selected
                await api.post(`/api/user-agents/${userId}`, { agentIds: [] });
            }

            setShowModal(false);
            loadUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || txt.failed);
        } finally {
            setSaving(false);
        }
    };

    const deleteUser = async (id) => {
        if (!confirm(txt.deleteConfirm)) return;
        try {
            await api.delete(`/api/users/${id}`);
            toast.success(txt.userDeleted);
            loadUsers();
        } catch (error) {
            toast.error(txt.failed);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadge = (role) => {
        const styles = {
            admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            user: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        };
        return styles[role] || styles.user;
    };

    return (
        <div className="p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">👥 {txt.title}</h1>
                    <p className="text-[var(--text-secondary)]">{txt.subtitle}</p>
                </div>
                <GradientButton onClick={() => openModal()}>{txt.addUser}</GradientButton>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder={txt.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
                />
            </div>

            {/* Users Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                            <Skeleton className="w-14 h-14 mb-4" variant="circular" />
                            <Skeleton className="w-32 h-5 mb-2" />
                            <Skeleton className="w-48 h-4" />
                        </div>
                    ))}
                </div>
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    icon="👥"
                    title={txt.noUsers}
                    description={searchQuery ? txt.tryDifferent : txt.addFirst}
                    action={!searchQuery}
                    actionLabel={txt.addUser}
                    onAction={() => openModal()}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <GlassCard key={user.id} className="p-6 group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl text-white font-bold group-hover:scale-110 transition-transform">
                                    {user.name?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IconButton size="sm" onClick={() => openModal(user)}>✏️</IconButton>
                                    <IconButton size="sm" variant="danger" onClick={() => deleteUser(user.id)}>🗑️</IconButton>
                                </div>
                            </div>

                            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{user.name}</h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-3 truncate">{user.email}</p>

                            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-primary)]">
                                <span className={`px-2 py-0.5 text-xs rounded-full border ${getRoleBadge(user.role)}`}>
                                    {user.role === 'admin' ? txt.admin : txt.user}
                                </span>
                                <Link
                                    href={`/admin/conversations/${user.id}`}
                                    className="text-sm text-[var(--primary)] hover:underline"
                                >
                                    {txt.chats} {isRTL ? '←' : '→'}
                                </Link>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                            {editingUser ? txt.editUser : txt.newUser}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-1">{txt.name} *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-1">{txt.email} *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-1">
                                    {txt.password} {editingUser ? txt.keepBlank : '*'}
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                    required={!editingUser}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-1">{txt.role}</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                >
                                    <option value="user">{txt.user}</option>
                                    <option value="admin">{txt.admin}</option>
                                </select>
                            </div>

                            {/* Agent Assignment */}
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">{txt.assignedAgents}</label>
                                <div className="max-h-40 overflow-y-auto bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl p-3 space-y-2">
                                    {agents.length === 0 ? (
                                        <p className="text-sm text-[var(--text-muted)]">{txt.noAgents}</p>
                                    ) : (
                                        agents.map((agent) => (
                                            <label key={agent.id} className="flex items-center gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.agentIds.includes(agent.id)}
                                                    onChange={(e) => {
                                                        const newIds = e.target.checked
                                                            ? [...formData.agentIds, agent.id]
                                                            : formData.agentIds.filter(id => id !== agent.id);
                                                        setFormData({ ...formData, agentIds: newIds });
                                                    }}
                                                    className="w-4 h-4 accent-purple-500"
                                                />
                                                <span className="text-[var(--text-primary)] text-sm">{agent.agent_name}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <GradientButton type="button" variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>
                                    {txt.cancel}
                                </GradientButton>
                                <GradientButton type="submit" loading={saving} className="flex-1">
                                    {editingUser ? txt.update : txt.create}
                                </GradientButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
