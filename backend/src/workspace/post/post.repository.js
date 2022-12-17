const { Op } = require('sequelize');
const { Users } = require('../../models');

class CommentRepository {
    constructor(foodLists) {
        this.FoodLists = foodLists;
    }

    getFoodList = async () => {
        const foodList = await this.FoodLists.findAll({
            raw: true,
            attributes: ['foodId','title','thumbnail'],
            order: [['createdAt', 'DESC']],
        });

        return foodList;
    };

    getFood = async ({foodId}) => {
        return await this.FoodLists.findOne({
            where: {foodId}
        })

    }

    createFood = async ({category,title,content,thumbnail,userId}) => {
        await this.FoodLists.create({category, title, content, thumbnail, userId});
    }
}

module.exports = CommentRepository;
