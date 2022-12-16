'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FoodLists extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Users, { foreignKey: 'userId' });
            this.hasMany(models.Comments, {
                as: 'Comments',
                foreignKey: 'foodId',
            });
        }
    }
    FoodLists.init(
        {
            foodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userId',
                },
                onDelete: 'cascade',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'FoodLists',
        }
    );
    return FoodLists;
};
