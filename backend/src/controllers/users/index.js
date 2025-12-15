/**
 * Users Controllers Index
 * AI Agent Hosting Platform
 * 
 * Central export for all user controllers
 */

const { getUsers, getUser, searchUsers } = require('./getUsersController');
const { createUser } = require('./createUserController');
const { updateUser } = require('./updateUserController');
const { deleteUser } = require('./deleteUserController');
const { assignAgent } = require('./assignAgentController');

module.exports = {
    getUsers,
    getUser,
    searchUsers,
    createUser,
    updateUser,
    deleteUser,
    assignAgent
};
