/**
 * Migration: Add Agent Maker fields to agents table
 * Adds fields for AI configuration and capabilities
 */

const { Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('agents', 'role', {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Agent role/title'
        });

        await queryInterface.addColumn('agents', 'model', {
            type: Sequelize.STRING(100),
            allowNull: true,
            defaultValue: 'gemini-2.5-flash',
            comment: 'AI model used'
        });

        await queryInterface.addColumn('agents', 'temperature', {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
            defaultValue: 0.7,
            comment: 'Model temperature (0-1)'
        });

        await queryInterface.addColumn('agents', 'instructions', {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'System instructions/prompt'
        });

        await queryInterface.addColumn('agents', 'capabilities', {
            type: Sequelize.JSON,
            allowNull: true,
            defaultValue: '{"webSearch":false,"codeInterpreter":false,"fileAnalysis":false}',
            comment: 'Agent capabilities'
        });

        console.log('✅ Added Agent Maker fields to agents table');
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('agents', 'role');
        await queryInterface.removeColumn('agents', 'model');
        await queryInterface.removeColumn('agents', 'temperature');
        await queryInterface.removeColumn('agents', 'instructions');
        await queryInterface.removeColumn('agents', 'capabilities');

        console.log('✅ Removed Agent Maker fields from agents table');
    }
};
