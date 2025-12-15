/**
 * HeroCard Model
 * AI Agent Hosting Platform
 * 
 * Stores hero carousel card images for homepage animation
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const HeroCard = sequelize.define('HeroCard', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        image_public_id: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        display_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'hero_cards',
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['display_order'] },
            { fields: ['is_active'] }
        ]
    });

    return HeroCard;
};
