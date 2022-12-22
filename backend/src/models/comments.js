'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Users, { foreignKey: 'userId' });
            this.belongsTo(models.FoodLists, { foreignKey: 'foodId' });
        }
    }
    Comments.init(
        {
            commentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            foodId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'foodLists',
                    key: 'foodId',
                },
                onDelete: 'cascade',
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    ket: 'userId',
                },
                onDelete: 'cascade',
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Comments',
        }
    );
    return Comments;
};
