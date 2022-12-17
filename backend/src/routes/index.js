const express = require('express');
const router = express.Router();
const CommentRouter = require('./comment.route.js');

router.use('/comment', CommentRouter);

module.exports = router;
