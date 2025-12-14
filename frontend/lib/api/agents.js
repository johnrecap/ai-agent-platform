// API Service Layer for Agents
// Handles all agent-related API calls

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const agentApi = {
    /**
     * Get all agents (admin)
     */
    async getAll(params = {}) {
        const { data } = await axios.get(`${API_URL}/api/agents`, {
            params,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return data;
    },

    /**
     * Get single agent
     */
    async getById(id) {
        const { data } = await axios.get(`${API_URL}/api/agents/${id}`);
        return data;
    },

    /**
     * Get user's agents
     */
    async getUserAgents(userId) {
        const { data } = await axios.get(`${API_URL}/api/agents/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return data;
    },

    /**
     * Create new agent
     */
    async create(agentData) {
        const { data } = await axios.post(`${API_URL}/api/agents`, agentData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return data;
    },

    /**
     * Update agent
     */
    async update(id, agentData) {
        const { data } = await axios.put(`${API_URL}/api/agents/${id}`, agentData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return data;
    },

    /**
     * Delete agent
     */
    async delete(id) {
        const { data } = await axios.delete(`${API_URL}/api/agents/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return data;
    },

    /**
     * Chat with agent (simple non-streaming)
     */
    async chat(agentId, message, conversationId = null) {
        const { data } = await axios.post(
            `${API_URL}/api/chat/${agentId}/simple`,
            {
                message,
                conversation_id: conversationId,
                user: `web_user_${Date.now()}`
            }
        );
        return data;
    }
};
