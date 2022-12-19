const { CommentError } = require('../../exceptions/index.exception');
const CommentService = require('../comments/comment.service');
class CommentController {
    commentService = new CommentService();

    createComment = async (req, res, next) => {
        try {
            const { foodId } = req.params;
            const { comment } = req.body;
            const userId = 1;

            await this.commentService.createComment(userId, foodId, comment);

            res.status(201).json({
                message: '댓글 등록 성공',
                type: 'success',
            });
        } catch (error) {
            next(error);
        }
    };

    getComments = async (req, res, next) => {
        try {
            const { foodId } = req.params;

            const existComments = await this.commentService.getComments(foodId);

            res.status(200).json({ data: existComments });
        } catch (error) {
            next(error);
        }
    };

    editComment = async (req, res, next) => {
        try {
            const userId = 1;
            const { commentId } = req.params;
            const { comment } = req.body;

            await this.commentService.editComment(userId, commentId, comment);

            res.status(200).json({
                message: '댓글 수정 성공',
                type: 'success',
            });
        } catch (error) {
            next(error);
        }
    };

    deleteComment = async (req, res, next) => {
        try {
            const userId = 1;
            const { commentId } = req.params;

            await this.commentService.deleteComment(commentId, userId);

            res.status(200).json({
                message: '댓글 삭제 성공',
                type: 'success',
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CommentController;
