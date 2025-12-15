/**
 * AutomationRule Model
 * AI Agent Platform
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AutomationRule = sequelize.define('AutomationRule', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    trigger: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {}
    },
    conditions: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    actions: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'paused'),
        defaultValue: 'inactive',
        allowNull: false
    },
    execution_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    last_executed: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }
}, {
    tableName: 'automation_rules',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = AutomationRule;
