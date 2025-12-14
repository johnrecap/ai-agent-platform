'use client';

import { useState, useRef, useEffect } from 'react';
import { agentApi } from '@/lib/api/agents';
import { toast } from 'react-hot-toast';

/**
 * Custom hook for Agent Maker functionality
 * Manages state and logic for creating and testing AI agents
 */
export function useAgentMaker() {
    // Agent configuration state
    const [agentConfig, setAgentConfig] = useState({
        agent_name: '',
        role: '',
        description: '',
        model: 'gemini-2.5-flash',
        temperature: 0.7,
        instructions: '',
        capabilities: {
            webSearch: true,
            codeInterpreter: false,
            fileAnalysis: false
        }
    });

    // Test modal state
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [testMessages, setTestMessages] = useState([]);
    const [testInput, setTestInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [currentAgentId, setCurrentAgentId] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const chatEndRef = useRef(null);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (isTestModalOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [testMessages, isTestModalOpen, isThinking]);

    // Toggle capability
    const handleCapabilityToggle = (key) => {
        setAgentConfig(prev => ({
            ...prev,
            capabilities: {
                ...prev.capabilities,
                [key]: !prev.capabilities[key]
            }
        }));
    };

    // Update config field
    const updateConfig = (field, value) => {
        setAgentConfig(prev => ({ ...prev, [field]: value }));
    };

    // Save agent
    const handleSaveAgent = async () => {
        if (!agentConfig.agent_name) {
            toast.error('يرجى إدخال اسم الـ Agent');
            return;
        }

        setIsSaving(true);
        try {
            const response = await agentApi.create({
                ...agentConfig,
                page_url: `/agent/${agentConfig.agent_name.replace(/\s+/g, '-')}-${Date.now()}`,
                page_title: agentConfig.agent_name,
                iframe_code: `<!-- Agent: ${agentConfig.agent_name} -->`,
                dify_api_key: process.env.NEXT_PUBLIC_DIFY_API_KEY || null
            });

            if (response.success) {
                setCurrentAgentId(response.data.id);
                toast.success(`تم حفظ Agent "${agentConfig.agent_name}" بنجاح!`);
            }
        } catch (error) {
            console.error('Error saving agent:', error);
            toast.error('حدث خطأ أثناء حفظ الـ Agent');
        } finally {
            setIsSaving(false);
        }
    };

    // Open test modal
    const openTestRun = () => {
        if (!agentConfig.agent_name) {
            toast.error('يرجى تسمية الـ Agent قبل الاختبار');
            return;
        }

        const greeting = `مرحباً! أنا ${agentConfig.agent_name}. ${agentConfig.role ? `أعمل كـ ${agentConfig.role}.` : ''} كيف يمكنني مساعدتك اليوم؟`;
        setTestMessages([{ role: 'agent', content: greeting }]);
        setIsTestModalOpen(true);
    };

    // Close test modal
    const closeTestRun = () => {
        setIsTestModalOpen(false);
    };

    // Send test message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!testInput.trim()) return;

        const userMessage = testInput.trim();
        setTestMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setTestInput('');
        setIsThinking(true);

        try {
            if (currentAgentId) {
                // Real agent - call backend API
                const response = await agentApi.chat(currentAgentId, userMessage, conversationId);

                if (response.success) {
                    setConversationId(response.data.conversation_id);
                    setTestMessages(prev => [...prev, { role: 'agent', content: response.data.answer }]);
                }
            } else {
                // Mock response for unsaved agent
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockResponse = `هذا رد تجريبي من ${agentConfig.agent_name}. لاختبار حقيقي، يرجى حفظ الـ Agent أولاً.\n\nالإعدادات الحالية:\n- النموذج: ${agentConfig.model}\n- درجة الحرارة: ${agentConfig.temperature}\n- القدرات: ${Object.keys(agentConfig.capabilities).filter(k => agentConfig.capabilities[k]).join(', ') || 'لا يوجد'}`;
                setTestMessages(prev => [...prev, { role: 'agent', content: mockResponse }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setTestMessages(prev => [...prev, {
                role: 'agent',
                content: 'عذراً، حدث خطأ أثناء الحصول على الرد. يرجى المحاولة مرة أخرى.'
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return {
        // State
        agentConfig,
        isSaving,
        isTestModalOpen,
        testMessages,
        testInput,
        isThinking,
        chatEndRef,

        // Setters
        setAgentConfig,
        setTestInput,

        // Handlers
        updateConfig,
        handleCapabilityToggle,
        handleSaveAgent,
        openTestRun,
        closeTestRun,
        handleSendMessage
    };
}
