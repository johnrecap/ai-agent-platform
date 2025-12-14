import { GradientButton } from '@/components/ui';
import AvatarUpload from '@/components/AvatarUpload';

/**
 * Agent Modal Component
 * Create/Edit modal with form
 */
export default function AgentModal({
    isOpen,
    onClose,
    editingAgent,
    formData,
    onFormChange,
    onSubmit,
    saving,
    txt,
    isRTL,
    onUploadSuccess
}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-2xl animate-fadeInUp"
                onClick={(e) => e.stopPropagation()}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                    {editingAgent ? txt.editAgent : txt.newAgent}
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Avatar Upload - only for editing */}
                    {editingAgent && (
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Avatar/Logo
                            </label>
                            <AvatarUpload
                                agentId={editingAgent.id}
                                currentAvatar={editingAgent.avatar_url}
                                onUploadSuccess={onUploadSuccess}
                            />
                        </div>
                    )}

                    {/* Agent Name */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            {txt.agentName} *
                        </label>
                        <input
                            type="text"
                            value={formData.agent_name}
                            onChange={(e) => onFormChange('agent_name', e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                            required
                        />
                    </div>

                    {/* Page Title */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            {txt.pageTitle}
                        </label>
                        <input
                            type="text"
                            value={formData.page_title}
                            onChange={(e) => onFormChange('page_title', e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                        />
                    </div>

                    {/* Dify API Key */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            🔑 {txt.difyApiKey} *
                        </label>
                        <input
                            type="password"
                            value={formData.dify_api_key}
                            onChange={(e) => onFormChange('dify_api_key', e.target.value)}
                            placeholder="app-xxxxxxxxxxxxxxxx"
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] font-mono"
                            required
                        />
                        <p className="text-xs text-[var(--text-tertiary)] mt-1">
                            {txt.difyApiKeyHint}
                        </p>
                    </div>

                    {/* Iframe Code */}
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            {txt.iframeCode}
                        </label>
                        <textarea
                            value={formData.iframe_code}
                            onChange={(e) => onFormChange('iframe_code', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] font-mono text-sm"
                            placeholder="Optional - for fallback iframe mode"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <GradientButton
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={onClose}
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
    );
}
