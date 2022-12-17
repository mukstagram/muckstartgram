const { Op, QueryTypes } = require('sequelize');
const { Users, sequelize } = require('../../models');
class CommentRepository {
    constructor(CommentModel, FoodListsModel) {
        this.commentModel = CommentModel;
        this.foodListsModel = FoodListsModel;
    }

    createComment = async (userId, foodId, comment) => {
        return this.commentModel.create({
            userId,
            foodId,
            comment,
        });
    };

    getComments = async (foodId) => {
        return await this.commentModel.findAll({
            where: { foodId },
            attributes: { exclude: ['foodId', 'userId', 'updatedAt'] },
            include: [{ model: Users, attributes: ['nickname'] }],
            raw: true,
        });
        // const query = `select c.commentId, c.comment, c.createdAt, u.nickname
        //                 from Comments c join Users u ON c.userId = u.userId
        //                 where c.foodId = ?`;
        // return sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        //     replacements: [`${foodId}`],
        // });
    };

    editComment = async (userId, commentId, comment) => {
        return this.commentModel.update(
            { comment },
            {
                where: {
                    [Op.and]: [{ userId }, { commentId }],
                },
            }
        );
    };

    deleteComment = async (commentId, userId) => {
        return this.commentModel.destroy({
            where: {
                [Op.and]: [{ commentId }, { userId }],
            },
        });
    };
}

module.exports = CommentRepository;
