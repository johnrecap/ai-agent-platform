'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for Agents page data and operations
 * Manages agents list, CRUD operations, and modal states
 */
export function useAgentsData(txt) {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAgent, setEditingAgent] = useState(null);
    const [embedAgent, setEmbedAgent] = useState(null);
    const [formData, setFormData] = useState({
        agent_name: '',
        page_title: '',
        dify_api_key: '',
        iframe_code: ''
    });
    const [saving, setSaving] = useState(false);

    // Load agents on mount
    useEffect(() => {
        loadAgents();
    }, []);

    // Load all agents
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

    // Open modal for create or edit
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
            setFormData({
                agent_name: '',
                page_title: '',
                dify_api_key: '',
                iframe_code: ''
            });
        }
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setEditingAgent(null);
    };

    // Handle form submit (create or update)
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

    // Delete agent
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

    // Update form field
    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return {
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
    };
}
