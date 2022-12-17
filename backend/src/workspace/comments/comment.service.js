const CommentRepository = require('../comments/comment.repository');
const { Comments, FoodLists } = require('../../models');
const { CommentError } = require('../../exceptions/index.exception');

class CommentService {
    commentRepository = new CommentRepository(Comments, FoodLists);

    createComment = async (userId, foodId, comment) => {
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
        const existComment = await this.commentRepository.getComments(foodId);

        if (!existComment)
            throw new CommentError(
                '댓글 조회에 실패하였습니다.',
                'NotFound',
                404
            );

        return existComment;
    };

    editComment = async (userId, commentId, comment) => {
        console.log(commentId);
        const isEdit = await this.commentRepository.editComment(
            userId,
            commentId,
            comment
        );

        console.log(isEdit);

        if (isEdit[0] === 0)
            throw new CommentError(
                '댓글 수정에 실패하였습니다.',
                'EditFailed',
                400
            );

        return isEdit;
    };

    deleteComment = async (commentId, userId) => {
        const isDelete = await this.commentRepository.deleteComment(
            commentId,
            userId
        );

        if (isDelete[0] === 0) {
            throw new CommentError(
                '댓글 삭제에 실패하였습니다.',
                'DeleteFailed',
                400
            );
        }
        return isDelete;
    };
}

module.exports = CommentService;
