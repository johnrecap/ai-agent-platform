/**
 * User-Agent Routes
 * AI Agent Hosting Platform
 * 
 * Handles user-agent assignment operations
 */

const express = require('express');
const router = express.Router();
const { User, Agent, UserAgent } = require('../models');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { ApiError } = require('../middleware/errorHandler');

// All routes require authentication
router.use(auth);

/**
 * @route   GET /api/user-agents/my-agents
 * @desc    Get current user's agents (owned + assigned)
 * @access  Private (any authenticated user)
 */
router.get('/my-agents', async (req, res, next) => {
    try {
        // Get owned agents
        const ownedAgents = await Agent.findAll({
            where: { user_id: req.user.id },
            attributes: ['id', 'agent_name', 'page_title', 'status']
        });

        // Get assigned agents
        const userWithAssignedAgents = await User.findByPk(req.user.id, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title', 'status']
            }]
        });

        // Combine and remove duplicates
        const allAgents = [...ownedAgents];
        const assignedAgents = userWithAssignedAgents?.assignedAgents || [];

        assignedAgents.forEach(agent => {
            if (!allAgents.find(a => a.id === agent.id)) {
                allAgents.push(agent);
            }
        });

        res.json({
            success: true,
            data: allAgents
        });
    } catch (error) {
        next(error);
    }
});

// Admin-only routes below
router.use(adminAuth);

/**
 * @route   GET /api/user-agents/:userId
 * @desc    Get agents assigned to a user
 * @access  Private/Admin
 */
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title', 'status']
            }]
        });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            success: true,
            data: user.assignedAgents || []
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /api/user-agents/:userId
 * @desc    Assign agents to a user
 * @access  Private/Admin
 */
router.post('/:userId', async (req, res, next) => {
    try {
        const { agentIds } = req.body;
        const userId = req.params.userId;

        if (!Array.isArray(agentIds)) {
            throw new ApiError(400, 'agentIds must be an array');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Remove existing assignments
        await UserAgent.destroy({ where: { user_id: userId } });

        // Create new assignments
        if (agentIds.length > 0) {
            const assignments = agentIds.map(agentId => ({
                user_id: userId,
                agent_id: agentId
            }));
            await UserAgent.bulkCreate(assignments, { ignoreDuplicates: true });
        }

        // Fetch updated assignments
        const updatedUser = await User.findByPk(userId, {
            include: [{
                model: Agent,
                as: 'assignedAgents',
                attributes: ['id', 'agent_name', 'page_title']
            }]
        });

        res.json({
            success: true,
            data: updatedUser.assignedAgents,
            message: 'Agents assigned successfully'
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   DELETE /api/user-agents/:userId/:agentId
 * @desc    Remove agent assignment from user
 * @access  Private/Admin
 */
router.delete('/:userId/:agentId', async (req, res, next) => {
    try {
        const { userId, agentId } = req.params;

        const deleted = await UserAgent.destroy({
            where: { user_id: userId, agent_id: agentId }
        });

        if (deleted === 0) {
            throw new ApiError(404, 'Assignment not found');
        }

        res.json({
            success: true,
            message: 'Agent unassigned successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
