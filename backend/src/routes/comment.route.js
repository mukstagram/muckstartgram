const express = require('express');
const router = express.Router();
const CommentController = require('../workspace/comments/comment.controller');
const commentController = new CommentController();
const authUserMiddleware = require('../middlewares/authUserMiddleware.js');

router.post('/:foodId', authUserMiddleware, commentController.createComment);
router.patch('/:commentId', authUserMiddleware, commentController.editComment);
router.delete('/:commentId', authUserMiddleware, commentController.deleteComment);

module.exports = router;
