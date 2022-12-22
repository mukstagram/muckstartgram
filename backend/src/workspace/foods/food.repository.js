const { Op } = require('sequelize');
const { Users, sequelize} = require('../../models');

class FoodRepository {
    constructor(foodLists) {
        this.FoodLists = foodLists;
    }

    getFoodList = async () => {
        const foodList = await this.FoodLists.findAll({
            raw: true,
            attributes: ['foodId', 'title', 'thumbnail', 'category'],
            order: [['createdAt', 'DESC']],
        });

        return foodList;
    };

    getFood = async ({ foodId }) => {
        return await this.FoodLists.findOne({
            raw: true,
            where: { foodId },
            attributes: [
                'foodId',
                'title',
                'thumbnail',
                'content',
                'category',
                'userId',
                [sequelize.col('User.nickname'), 'nickname'],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
        });
    };

    createFood = async ({ category, title, content, thumbnail, userId }) => {
        await this.FoodLists.create({
            category,
            title,
            content,
            thumbnail,
            userId,
        });
    };

    deleteFood = async ({ foodId }) => {
        return await this.FoodLists.destroy({
            where: { foodId:foodId }
        });
    }

    editFood = async ({foodId,category, title, content, thumbnail}) => {
        await this.FoodLists.update(
            {
                category,
                title,
                content,
                thumbnail
            },
            {
                where: { foodId },
            }
        );
    }
}

module.exports = FoodRepository;
