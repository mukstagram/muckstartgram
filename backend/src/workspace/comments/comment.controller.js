const { CommentError } = require('../../exceptions/index.exception');
const CommentService = require('../comments/comment.service');
// const FoodListsService = require('../../workspace/post/post.service');

class CommentController {
    commentService = new CommentService();
    // foodListsService = new FoodListsService();

    createComment = async (req, res, next) => {
        try {
            const { foodId } = req.params;
            const { comment } = req.body;
            const userId = 1;

            if (!foodId || !comment || !foodId) {
                throw new CommentError(
                    '데이터 형식이 올바르지 않습니다.',
                    'InvalidParamsError',
                    412
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

            // const exitsFood = await this.foodListsService.getFoodDetail({
            //     foodId,
            // });

            // console.log(exitsFood);

            // if (!exitsFood)
            //     throw new CommentError(
            //         '존재하지 않는 게시물입니다.',
            //         'NotFoundFood',
            //         404
            //     );

            const existComments = await this.commentService.getComments(foodId);

            res.status(200).json({ result: existComments });
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

            if (!commentId || !userId) {
                throw new CommentError(
                    '데이터 형식이 올바르지 않습니다.',
                    'InvalidParamsError',
                    412
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
