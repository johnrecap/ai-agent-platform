'use client';

import { useLanguage } from '@/lib/language';
import { useAgentsData } from './hooks/useAgentsData';
import AgentsHeader from './components/AgentsHeader';
import AgentsGrid from './components/AgentsGrid';
import AgentModal from './components/AgentModal';
import EmbedCodeGenerator from '@/components/EmbedCodeGenerator';

/**
 * AI Agents Management Page
 * Manage AI agents with CRUD operations and embed codes
 */
export default function AgentsPage() {
    const { isRTL, language } = useLanguage();

    // Translations
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
        embed: language === 'ar' ? 'فقط قم بالنسخ' : 'Get Embed Code',
    };

    // Hooks
    const {
        agents,
        loading,
        showModal,
        editingAgent,
        embedAgent,
        formData,
        saving,
        setEmbedAgent,
        setEditingAgent,
        openModal,
        closeModal,
        handleSubmit,
        deleteAgent,
        updateFormData,
        loadAgents
    } = useAgentsData(txt);

    return (
        <div className="min-h-screen p-6 lg:p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <AgentsHeader
                txt={txt}
                onCreateClick={() => openModal()}
            />

            <AgentsGrid
                loading={loading}
                agents={agents}
                txt={txt}
                isRTL={isRTL}
                onEdit={openModal}
                onDelete={deleteAgent}
                onEmbed={setEmbedAgent}
                onCreateClick={() => openModal()}
            />

            <AgentModal
                isOpen={showModal}
                onClose={closeModal}
                editingAgent={editingAgent}
                formData={formData}
                onFormChange={updateFormData}
                onSubmit={handleSubmit}
                saving={saving}
                txt={txt}
                isRTL={isRTL}
                onUploadSuccess={(data) => {
                    setEditingAgent({ ...editingAgent, avatar_url: data.avatar_url });
                    loadAgents();
                }}
            />

            <EmbedCodeGenerator
                agent={embedAgent}
                isOpen={!!embedAgent}
                onClose={() => setEmbedAgent(null)}
            />
        </div>
    );
}
