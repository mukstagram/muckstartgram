const { InvalidParamsError } = require('../../exceptions/index.exception');
const CommentService = require('../comments/comment.service');
class CommentController {
    commentService = new CommentService();

    createComment = async (req, res, next) => {
        try {
            const { foodId } = req.params;
            const { comment } = req.body;
            const { userId } = res.locals.user;

            if (!userId) {
                throw InvalidParamsError(
                    '잘못된 데이터 형식입니다',
                    'ParamsError'
                );
            }

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
            const { userId } = res.locals.user;
            const { commentId } = req.params;
            const { comment } = req.body;

            if (!userId) {
                throw InvalidParamsError(
                    '잘못된 데이터 형식입니다',
                    'ParamsError'
                );
            }

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
            const { userId } = res.locals.user;
            const { commentId } = req.params;

            if (!userId) {
                throw InvalidParamsError(
                    '잘못된 데이터 형식입니다',
                    'ParamsError'
                );
            }

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
