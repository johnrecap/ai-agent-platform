/**
 * Models Index - Exports and Associations
 * AI Agent Hosting Platform
 */

const { sequelize } = require('../config/database');
const config = require('../config/config');

// Import models directly (they're already initialized in their files)
const User = require('./User');
const Agent = require('./Agent');
const Conversation = require('./Conversation');
const UserAgent = require('./UserAgent');
const HeroCard = require('./HeroCard');

// ==========================================
// Define Model Associations
// ==========================================

// User has many Agents (as owner)
User.hasMany(Agent, {
    foreignKey: 'user_id',
    as: 'agents',
    onDelete: 'CASCADE'
});
Agent.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Many-to-Many: Users can access multiple Agents
User.belongsToMany(Agent, {
    through: UserAgent,
    foreignKey: 'user_id',
    otherKey: 'agent_id',
    as: 'assignedAgents'
});
Agent.belongsToMany(User, {
    through: UserAgent,
    foreignKey: 'agent_id',
    otherKey: 'user_id',
    as: 'assignedUsers'
});

// Agent has many Conversations
Agent.hasMany(Conversation, {
    foreignKey: 'agent_id',
    as: 'conversations',
    onDelete: 'CASCADE'
});
Conversation.belongsTo(Agent, {
    foreignKey: 'agent_id',
    as: 'agent'
});

// User has many Conversations
User.hasMany(Conversation, {
    foreignKey: 'user_id',
    as: 'conversations',
    onDelete: 'CASCADE'
});
Conversation.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// ==========================================
// Seed Default Admin User
// ==========================================
const seedDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({
            where: { email: config.defaultAdmin.email }
        });

        if (!adminExists) {
            await User.create({
                name: config.defaultAdmin.name,
                email: config.defaultAdmin.email,
                password: config.defaultAdmin.password,
                role: config.defaultAdmin.role
            });
            console.log(`✅ Default admin user created (${config.defaultAdmin.email})`);
        } else {
            console.log('ℹ️  Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
    }
};

module.exports = {
    sequelize,
    User,
    Agent,
    Conversation,
    UserAgent,
    HeroCard,
    seedDefaultAdmin
};
