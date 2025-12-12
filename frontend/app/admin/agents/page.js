'use client';

/**
 * AI Agents Management Page with i18n
 * AI Agent Platform - Premium 2026 Design
 */

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useLanguage } from '@/lib/language';
import toast from 'react-hot-toast';
import { GlassCard, GradientButton, Skeleton, EmptyState, StatusBadge, IconButton } from '@/components/ui';
import EmbedCodeGenerator from '@/components/EmbedCodeGenerator';

export default function AgentsPage() {
    const { t, isRTL, language } = useLanguage();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAgent, setEditingAgent] = useState(null);
    const [embedAgent, setEmbedAgent] = useState(null); // Agent for embed modal
    const [formData, setFormData] = useState({ agent_name: '', page_title: '', dify_api_key: '', iframe_code: '' });
    const [saving, setSaving] = useState(false);

    const txt = {
        title: language === 'ar' ? 'الوكلاء الذكية' : 'AI Agents',
        subtitle: language === 'ar' ? 'إدارة وكلاء الذكاء الاصطناعي وإعداداتهم' : 'Manage your AI agents and their configurations',
        createAgent: language === 'ar' ? '+ إنشاء وكيل' : '+ Create Agent',
        noAgents: language === 'ar' ? 'لا يوجد وكلاء بعد' : 'No agents yet',
        createFirst: language === 'ar' ? 'أنشئ أول وكيل ذكاء اصطناعي للبدء' : 'Create your first AI agent to get started',
        noDesc: language === 'ar' ? 'بدون وصف' : 'No description',
        active: language === 'ar' ? 'نشط' : 'Active',
        view: language === 'ar' ? 'عرض' : 'View',
        editAgent: language === 'ar' ? '✏️ تعديل الوكيل' : '✏️ Edit Agent',
        newAgent: language === 'ar' ? '🤖 إنشاء وكيل' : '🤖 Create Agent',
        agentName: language === 'ar' ? 'اسم الوكيل' : 'Agent Name',
        pageTitle: language === 'ar' ? 'عنوان الصفحة' : 'Page Title',
        difyApiKey: language === 'ar' ? 'مفتاح Dify API' : 'Dify API Key',
        difyApiKeyHint: language === 'ar' ? 'من Backend Service API في Dify' : 'From Backend Service API in Dify',
        iframeCode: language === 'ar' ? 'كود الـ Iframe (اختياري)' : 'Iframe Code (Optional)',
        cancel: language === 'ar' ? 'إلغاء' : 'Cancel',
        create: language === 'ar' ? 'إنشاء' : 'Create',
        update: language === 'ar' ? 'تحديث' : 'Update',
        deleteConfirm: language === 'ar' ? 'هل تريد حذف هذا الوكيل؟' : 'Delete this agent?',
        agentUpdated: language === 'ar' ? 'تم تحديث الوكيل!' : 'Agent updated!',
        agentCreated: language === 'ar' ? 'تم إنشاء الوكيل!' : 'Agent created!',
        agentDeleted: language === 'ar' ? 'تم حذف الوكيل' : 'Agent deleted',
        failed: language === 'ar' ? 'فشل' : 'Failed',
        failed: language === 'ar' ? 'فشل' : 'Failed',
        hasApiKey: language === 'ar' ? '🔑 مفتاح API' : '🔑 API Key',
        embed: language === 'ar' ? 'فقط قم بالنسخ' : 'Get Embed Code',
    };

    useEffect(() => {
        loadAgents();
    }, []);

    const loadAgents = async () => {
        try {
            const response = await api.get('/api/agents?limit=50');
            setAgents(response.data.data || []);
        } catch (error) {
            toast.error(txt.failed);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (agent = null) => {
        if (agent) {
            setEditingAgent(agent);
            setFormData({
                agent_name: agent.agent_name,
                page_title: agent.page_title || '',
                dify_api_key: agent.dify_api_key || '',
                iframe_code: agent.iframe_code || ''
            });
        } else {
            setEditingAgent(null);
            setFormData({ agent_name: '', page_title: '', dify_api_key: '', iframe_code: '' });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingAgent) {
                await api.put(`/api/agents/${editingAgent.id}`, formData);
                toast.success(txt.agentUpdated);
            } else {
                await api.post('/api/agents', formData);
                toast.success(txt.agentCreated);
            }
            setShowModal(false);
            loadAgents();
        } catch (error) {
            toast.error(error.response?.data?.message || txt.failed);
        } finally {
            setSaving(false);
        }
    };

    const deleteAgent = async (id) => {
        if (!confirm(txt.deleteConfirm)) return;
        try {
            await api.delete(`/api/agents/${id}`);
            toast.success(txt.agentDeleted);
            loadAgents();
        } catch (error) {
            toast.error(txt.failed);
        }
    };

    return (
        <div className="min-h-screen p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        🤖 {txt.title}
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        {txt.subtitle}
                    </p>
                </div>
                <GradientButton onClick={() => openModal()}>
                    {txt.createAgent}
                </GradientButton>
            </div>

            {/* Agents Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-primary)]">
                            <Skeleton className="w-16 h-16 mb-4" variant="circular" />
                            <Skeleton className="w-32 h-6 mb-2" />
                            <Skeleton className="w-full h-4 mb-4" />
                            <Skeleton className="w-24 h-8" />
                        </div>
                    ))}
                </div>
            ) : agents.length === 0 ? (
                <EmptyState
                    icon="🤖"
                    title={txt.noAgents}
                    description={txt.createFirst}
                    action
                    actionLabel={txt.createAgent}
                    onAction={() => openModal()}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, index) => (
                        <GlassCard
                            key={agent.id}
                            className="p-6 group animate-fadeInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl text-white group-hover:scale-110 transition-transform">
                                    🤖
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IconButton
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => setEmbedAgent(agent)}
                                        title={txt.embed}
                                    >
                                        &lt;/&gt;
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        onClick={() => openModal(agent)}
                                        aria-label="Edit agent"
                                    >
                                        ✏️
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        variant="danger"
                                        onClick={() => deleteAgent(agent.id)}
                                        aria-label="Delete agent"
                                    >
                                        🗑️
                                    </IconButton>
                                </div>
                            </div>

                            {/* Info */}
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                                {agent.agent_name}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                                {agent.page_title || txt.noDesc}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
                                <StatusBadge status="online" label={txt.active} />
                                <a
                                    href={`/agent/${agent.id}`}
                                    target="_blank"
                                    className="text-sm text-[var(--primary)] hover:underline"
                                >
                                    {txt.view} {isRTL ? '←' : '→'}
                                </a>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-2xl animate-fadeInUp"
                        onClick={(e) => e.stopPropagation()}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                            {editingAgent ? txt.editAgent : txt.newAgent}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    {txt.agentName} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.agent_name}
                                    onChange={(e) => setFormData({ ...formData, agent_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    {txt.pageTitle}
                                </label>
                                <input
                                    type="text"
                                    value={formData.page_title}
                                    onChange={(e) => setFormData({ ...formData, page_title: e.target.value })}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    🔑 {txt.difyApiKey} *
                                </label>
                                <input
                                    type="password"
                                    value={formData.dify_api_key}
                                    onChange={(e) => setFormData({ ...formData, dify_api_key: e.target.value })}
                                    placeholder="app-xxxxxxxxxxxxxxxx"
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] font-mono"
                                    required
                                />
                                <p className="text-xs text-[var(--text-tertiary)] mt-1">
                                    {txt.difyApiKeyHint}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    {txt.iframeCode}
                                </label>
                                <textarea
                                    value={formData.iframe_code}
                                    onChange={(e) => setFormData({ ...formData, iframe_code: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] font-mono text-sm"
                                    placeholder="Optional - for fallback iframe mode"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <GradientButton
                                    type="button"
                                    variant="secondary"
                                    className="flex-1"
                                    onClick={() => setShowModal(false)}
                                >
                                    {txt.cancel}
                                </GradientButton>
                                <GradientButton
                                    type="submit"
                                    loading={saving}
                                    className="flex-1"
                                >
                                    {editingAgent ? txt.update : txt.create}
                                </GradientButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
            {/* Embed Modal */ }
    <EmbedCodeGenerator
        agent={embedAgent}
        isOpen={!!embedAgent}
        onClose={() => setEmbedAgent(null)}
    />
        </div >
    );
}
