/**
 * User Model
 * AI Agent Hosting Platform
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Name is required' },
            len: { args: [2, 255], msg: 'Name must be between 2 and 255 characters' }
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: { msg: 'Email already exists' },
        validate: {
            isEmail: { msg: 'Invalid email format' },
            notEmpty: { msg: 'Email is required' }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Password is required' },
            len: { args: [6, 255], msg: 'Password must be at least 6 characters' }
        }
    },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user',
        validate: {
            isIn: { args: [['admin', 'user']], msg: 'Role must be admin or user' }
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
        // Hash password before creating user
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        // Hash password before updating if changed
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Instance method to compare passwords
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Hide password in JSON output
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = User;
