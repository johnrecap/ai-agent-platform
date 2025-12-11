/**
 * Agent Model
 * AI Agent Hosting Platform
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Agent = sequelize.define('Agent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    agent_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Agent name is required' },
            len: { args: [2, 255], msg: 'Agent name must be between 2 and 255 characters' }
        }
    },
    iframe_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Iframe code is required' }
        }
    },
    iframe_url: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    page_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: { msg: 'Page URL already exists' },
        validate: {
            notEmpty: { msg: 'Page URL is required' }
        }
    },
    page_title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'active',
        validate: {
            isIn: { args: [['active', 'inactive']], msg: 'Status must be active or inactive' }
        }
    },
    dify_api_key: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Dify Backend Service API key for this agent'
    }
}, {
    tableName: 'agents',
    timestamps: true,
    underscored: true,
    hooks: {
        // Extract iframe URL before creating
        beforeCreate: (agent) => {
            if (agent.iframe_code && !agent.iframe_url) {
                const match = agent.iframe_code.match(/src=["']([^"']+)["']/);
                if (match) {
                    agent.iframe_url = match[1];
                }
            }
        },
        // Extract iframe URL before updating
        beforeUpdate: (agent) => {
            if (agent.changed('iframe_code')) {
                const match = agent.iframe_code.match(/src=["']([^"']+)["']/);
                if (match) {
                    agent.iframe_url = match[1];
                }
            }
        }
    }
});

module.exports = Agent;
