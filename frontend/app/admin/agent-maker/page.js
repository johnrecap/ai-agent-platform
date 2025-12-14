'use client';

import AgentMakerHeader from './components/AgentMakerHeader';
import AgentIdentitySection from './components/AgentIdentitySection';
import AgentIntelligenceSection from './components/AgentIntelligenceSection';
import AgentCapabilitiesSection from './components/AgentCapabilitiesSection';
import AgentPreviewCard from './components/AgentPreviewCard';
import TestRunModal from './components/TestRunModal';
import { useAgentMaker } from './hooks/useAgentMaker';

/**
 * Agent Maker Page
 * Create and configure custom AI agents with visual interface
 */
export default function AgentMaker() {
    const {
        agentConfig,
        isSaving,
        isTestModalOpen,
        testMessages,
        testInput,
        isThinking,
        chatEndRef,
        setTestInput,
        updateConfig,
        handleCapabilityToggle,
        handleSaveAgent,
        openTestRun,
        closeTestRun,
        handleSendMessage
    } = useAgentMaker();

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-6">
            <AgentMakerHeader
                onTest={openTestRun}
                onSave={handleSaveAgent}
                isSaving={isSaving}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Configuration */}
                <div className="lg:col-span-8 space-y-6">
                    <AgentIdentitySection
                        config={agentConfig}
                        onChange={updateConfig}
                    />
                    <AgentIntelligenceSection
                        config={agentConfig}
                        onChange={updateConfig}
                    />
                    <AgentCapabilitiesSection
                        capabilities={agentConfig.capabilities}
                        onToggle={handleCapabilityToggle}
                    />
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-4">
                    <AgentPreviewCard
                        config={agentConfig}
                        onTestClick={openTestRun}
                    />
                </div>
            </div>

            {/* Test Modal */}
            <TestRunModal
                isOpen={isTestModalOpen}
                onClose={closeTestRun}
                config={agentConfig}
                messages={testMessages}
                input={testInput}
                onInputChange={setTestInput}
                onSend={handleSendMessage}
                isThinking={isThinking}
                chatEndRef={chatEndRef}
            />
        </div>
    );
}
