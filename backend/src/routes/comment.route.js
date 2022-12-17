const express = require('express');
const router = express.Router();
const CommentController = require('../workspace/comments/comment.controller');
const commentController = new CommentController();

router.post('/:foodId', commentController.createComment);
router.get('/:foodId', commentController.getComments);
router.put('/:commentId', commentController.editComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
