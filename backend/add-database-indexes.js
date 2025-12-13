/**
 * Database Performance Optimization - Add Indexes
 * AI Agent Platform
 * 
 * This migration adds critical indexes to improve query performance
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function addDatabaseIndexes() {
    try {
        console.log('🚀 Starting database optimization...\n');

        // Connect to database
        await sequelize.authenticate();
        console.log('✅ Database connection established\n');

        // Add indexes for conversations table
        console.log('📊 Adding indexes for conversations table...');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_conversations_agent_id 
            ON conversations(agent_id);
        `);
        console.log('  ✓ idx_conversations_agent_id created');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_conversations_user_id 
            ON conversations(user_id);
        `);
        console.log('  ✓ idx_conversations_user_id created');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_conversations_created_at 
            ON conversations(created_at DESC);
        `);
        console.log('  ✓ idx_conversations_created_at created');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_conversations_agent_user 
            ON conversations(agent_id, user_id);
        `);
        console.log('  ✓ idx_conversations_agent_user created (composite)\n');

        // Add indexes for user_agents table
        console.log('📊 Adding indexes for user_agents table...');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_user_agents_user_id 
            ON user_agents(user_id);
        `);
        console.log('  ✓ idx_user_agents_user_id created');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_user_agents_agent_id 
            ON user_agents(agent_id);
        `);
        console.log('  ✓ idx_user_agents_agent_id created\n');

        // Add indexes for agents table
        console.log('📊 Adding indexes for agents table...');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_agents_user_id 
            ON agents(user_id);
        `);
        console.log('  ✓ idx_agents_user_id created');

        await sequelize.query(`
            CREATE INDEX IF NOT EXISTS idx_agents_status 
            ON agents(status);
        `);
        console.log('  ✓ idx_agents_status created\n');

        // Verify indexes created
        console.log('🔍 Verifying indexes...');
        const result = await sequelize.query(`
            SELECT 
                tablename, 
                indexname 
            FROM pg_indexes 
            WHERE schemaname = 'public' 
            AND indexname LIKE 'idx_%'
            ORDER BY tablename, indexname;
        `);

        console.log('\n📋 Installed indexes:');
        result[0].forEach(row => {
            console.log(`  • ${row.tablename}.${row.indexname}`);
        });

        console.log('\n✨ Database optimization completed successfully!');
        console.log('📈 Expected performance improvement: 2-3x faster queries\n');

    } catch (error) {
        console.error('❌ Error adding indexes:', error.message);
        throw error;
    } finally {
        await sequelize.close();
    }
}

// Run migration
addDatabaseIndexes()
    .then(() => {
        console.log('✅ Migration completed');
        process.exit(0);
    })
    .catch(error => {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    });
