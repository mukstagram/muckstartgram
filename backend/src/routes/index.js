const express = require('express');
const router = express.Router();
const foodRouter = require("./post.route.js");
const CommentRouter = require('./comment.route.js');

router.use('/post',foodRouter);
router.use('/comment', CommentRouter);
router.use("/", require("./user.router.js"));

module.exports = router;
