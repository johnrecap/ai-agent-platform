/**
 * Migration Script: Create user_agents table
 * Run this once to create the junction table for user-agent assignments
 */

require('dotenv').config();
const { sequelize } = require('./src/config/database');

async function migrate() {
    try {
        console.log('🔧 Running migration: Create user_agents table...');

        // Check if table exists
        const [results] = await sequelize.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'user_agents'
            );
        `);

        if (results[0].exists) {
            console.log('ℹ️  user_agents table already exists');
            process.exit(0);
        }

        // Create the table
        await sequelize.query(`
            CREATE TABLE user_agents (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                agent_id INTEGER NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
                access_level VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, agent_id)
            );
        `);

        console.log('✅ Migration successful! user_agents table created.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
