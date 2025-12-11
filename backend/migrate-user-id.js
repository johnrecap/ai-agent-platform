/**
 * Migration Script: Make user_id nullable in conversations table
 * Run this once to fix the NOT NULL constraint
 */

require('dotenv').config();
const { sequelize } = require('./src/config/database');

async function migrate() {
    try {
        console.log('🔧 Running migration: Make user_id nullable in conversations...');

        await sequelize.query(`
            ALTER TABLE conversations 
            ALTER COLUMN user_id DROP NOT NULL;
        `);

        console.log('✅ Migration successful! user_id is now nullable.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
