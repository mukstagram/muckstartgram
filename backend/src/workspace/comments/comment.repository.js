const { Op } = require('sequelize');
const { sequelize, Users } = require('../../models');
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
        return this.commentModel.findAll({
            raw: true,
            attributes: [
                'commentId',
                'comment',
                'createdAt',
                [sequelize.col('User.nickname'), 'nickname'],
            ],
            where: { foodId },
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            order: [['createdAt', 'DESC']],
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
