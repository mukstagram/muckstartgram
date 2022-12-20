const CommentRepository = require('../comments/comment.repository');
const PostRepository = require('../foods/food.repository');
const { Comments, FoodLists } = require('../../models');
const { CommentError } = require('../../exceptions/index.exception');

class CommentService {
    commentRepository = new CommentRepository(Comments);
    postRepository = new PostRepository(FoodLists);

    createComment = async (userId, foodId, comment) => {
        const existPost = await this.postRepository.getFood({ foodId });

        if (!existPost) {
            throw new CommentError(
                '존재하지 않는 게시물입니다.',
                'NotFoundPost',
                404
            );
        }

        if (!comment) {
            throw new CommentError(
                '댓글 내용을 입력해주세요',
                'InvalidParamsError',
                400
            );
        }

        const isCreate = await this.commentRepository.createComment(
            userId,
            foodId,
            comment
        );

        if (!isCreate)
            throw new CommentError(
                '댓글작성에 실패하였습니다',
                'CreatedFailed',
                400
            );

        return isCreate;
    };

    getComments = async (foodId) => {
        const existPost = await this.postRepository.getFood({ foodId });

        if (!existPost) {
            throw new CommentError(
                '존재하지 않는 게시물입니다.',
                'NotFoundPost',
                404
            );
        }

        return await this.commentRepository.getComments(foodId);
    };

    editComment = async (userId, commentId, comment) => {
        if (!comment) {
            throw new CommentError('댓글 내용을 입력해주세요');
        }

        const existComments = await this.commentRepository.findComment(
            commentId
        );

        if (!existComments) {
            throw new CommentError(
                '존재하지 않는 댓글입니다.',
                'NotFoundComment',
                404
            );
        }

        const isEdit = await this.commentRepository.editComment(
            userId,
            commentId,
            comment
        );

        if (isEdit[0] === 0)
            throw new CommentError(
                '댓글 작성자만 수정이 가능합니다.',
                'EditFailed',
                403
            );

        return isEdit;
    };

    deleteComment = async (commentId, userId) => {
        const existComments = await this.commentRepository.findComment(
            commentId
        );

        if (!existComments) {
            throw new CommentError(
                '존재하지 않는 댓글입니다.',
                'NotFoundComment',
                404
            );
        }

        const isDelete = await this.commentRepository.deleteComment(
            commentId,
            userId
        );

        if (!isDelete) {
            throw new CommentError(
                '댓글 작성자만 삭제가 가능합니다.',
                'DeleteFailed',
                403
            );
        }
        return isDelete;
    };
}

module.exports = CommentService;
