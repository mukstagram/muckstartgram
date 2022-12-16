'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Comments, {
                as: 'Comments',
                foreignKey: 'userId',
            });
            this.hasMany(models.FoodLists, {
                as: 'FoodLists',
                foreignKey: 'userId',
            });
        }
    }
    Users.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nickname: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Users',
        }
    );
    return Users;
};
