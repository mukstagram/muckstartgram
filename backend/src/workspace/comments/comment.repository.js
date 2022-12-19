const { Op, QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');
class CommentRepository {
    constructor(CommentModel) {
        this.commentModel = CommentModel;
    }

    findComment = async (commentId) => {
        return this.commentModel.findOne({
            where: { commentId },
        });
    };

    createComment = async (userId, foodId, comment) => {
        return this.commentModel.create({
            userId,
            foodId,
            comment,
        });
    };

    getComments = async (foodId) => {
        const query = `select c.commentId, c.comment, c.createdAt, u.nickname
                        from Comments c join Users u ON c.userId = u.userId
                        where c.foodId = ?
                        order by createdAt desc`;

        return sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: [`${foodId}`],
        });
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
