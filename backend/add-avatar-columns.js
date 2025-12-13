/**
 * Database Migration - Add Avatar Columns to Agents Table
 * AI Agent Platform
 */

const { sequelize } = require('./src/config/database');
require('dotenv').config();

async function addAvatarColumns() {
    try {
        console.log('🔧 Starting avatar columns migration...');

        // Add avatar_url column
        await sequelize.query(`
            ALTER TABLE agents 
            ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);
        `);
        console.log('✅ Added avatar_url column');

        // Add avatar_public_id column (for Cloudinary management)
        await sequelize.query(`
            ALTER TABLE agents 
            ADD COLUMN IF NOT EXISTS avatar_public_id VARCHAR(255);
        `);
        console.log('✅ Added avatar_public_id column');

        // Add avatar_updated_at column
        await sequelize.query(`
            ALTER TABLE agents 
            ADD COLUMN IF NOT EXISTS avatar_updated_at TIMESTAMP;
        `);
        console.log('✅ Added avatar_updated_at column');

        console.log('🎉 Avatar columns migration completed successfully!');

    } catch (error) {
        console.error('❌ Error during migration:', error.message);
        throw error;
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

// Run migration
addAvatarColumns();
