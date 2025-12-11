/**
 * UserAgent Model - Junction table for User-Agent relationship
 * AI Agent Hosting Platform
 * 
 * Allows linking users to multiple agents they can access
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserAgent = sequelize.define('UserAgent', {
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
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'agents',
            key: 'id'
        }
    },
    access_level: {
        type: DataTypes.STRING(50),
        defaultValue: 'user', // 'user' = can chat, 'manager' = can view stats
        validate: {
            isIn: [['user', 'manager']]
        }
    }
}, {
    tableName: 'user_agents',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'agent_id']
        }
    ]
});

module.exports = UserAgent;
