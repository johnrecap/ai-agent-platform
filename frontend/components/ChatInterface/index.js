'use client';

import { useChatLogic } from '@/hooks/chat/useChatLogic';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

/**
 * Chat Interface Component
 * Main chat interface with AI agent integration
 * 
 * @param {string} agentId - Agent ID for chat API
 * @param {string} agentName - Display name of the agent
 * @param {string} avatarUrl - Agent avatar image URL
 * @param {boolean} isWidget - Whether displayed as widget or full page
 */
export default function ChatInterface({ agentId, agentName, avatarUrl, isWidget = false }) {
    const {
        messages,
        input,
        setInput,
        loading,
        streamingMessage,
        messagesEndRef,
        inputRef,
        sendMessage,
        resetConversation
    } = useChatLogic(agentId);

    // Responsive classes based on context
    const containerClasses = isWidget
        ? 'flex flex-col h-full bg-[#0f0f1a]' // Widget: Full height, plain dark bg
        : 'flex flex-col h-full min-h-[600px] max-h-[80vh] bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] rounded-3xl overflow-hidden border border-white/10 shadow-2xl'; // Full page

    return (
        <div className={containerClasses}>
            <ChatHeader
                agentName={agentName}
                avatarUrl={avatarUrl}
                onReset={resetConversation}
            />

            <ChatMessages
                messages={messages}
                streamingMessage={streamingMessage}
                loading={loading}
                messagesEndRef={messagesEndRef}
            />

            <ChatInput
                input={input}
                onInputChange={setInput}
                onSend={sendMessage}
                loading={loading}
                inputRef={inputRef}
            />
        </div>
    );
}
