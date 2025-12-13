/**
 * Database Migration - Add Soft Delete Columns to Conversations
 * AI Agent Platform
 */

const { sequelize } = require('./src/config/database');
require('dotenv').config();

async function addSoftDeleteColumns() {
    try {
        console.log('🔧 Starting soft delete migration...');

        // Add deleted_at column
        await sequelize.query(`
            ALTER TABLE conversations 
            ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP;
        `);
        console.log('✅ Added deleted_at column');

        // Add deleted_by column (references users table)
        await sequelize.query(`
            ALTER TABLE conversations 
            ADD COLUMN IF NOT EXISTS deleted_by INTEGER REFERENCES users(id);
        `);
        console.log('✅ Added deleted_by column');

        console.log('🎉 Soft delete migration completed successfully!');

    } catch (error) {
        console.error('❌ Error during migration:', error.message);
        throw error;
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

// Run migration
addSoftDeleteColumns();
