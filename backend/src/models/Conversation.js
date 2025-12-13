/**
 * Conversation Model
 * AI Agent Hosting Platform
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversation = sequelize.define('Conversation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Made optional for imported conversations
        references: {
            model: 'agents',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Made optional for Dify chat conversations (anonymous users)
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: 'Conversation title or identifier'
    },
    conversation_type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: 'general',
        comment: 'Type: course, consultation, support, general, etc.'
    },
    session_id: {
        type: DataTypes.STRING(255),
        allowNull: true,  // Made optional for imported conversations
        unique: false     // Removed unique constraint for Excel imports
    },
    thread_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    messages: {
        type: DataTypes.JSONB,
        defaultValue: [],
        allowNull: false
    },
    visitor_info: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    message_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'active',
        validate: {
            isIn: { args: [['active', 'completed', 'archived']], msg: 'Invalid status' }
        }
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Soft delete timestamp'
    },
    deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        comment: 'User who deleted this conversation'
    }
}, {
    tableName: 'conversations',
    timestamps: true,
    underscored: true,
    paranoid: true,  // Enable soft delete
    deletedAt: 'deleted_at',  // Custom column name for soft delete
    indexes: [
        { fields: ['agent_id'] },
        { fields: ['user_id'] },
        { fields: ['conversation_type'] },
        { fields: ['status'] },
        { fields: ['created_at'] },
        { fields: ['deleted_at'] }  // Index for soft delete queries
    ]
});

module.exports = Conversation;
