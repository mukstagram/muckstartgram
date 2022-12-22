const express = require('express');
const router = express.Router();
const foodRouter = require("./food.route.js");
const CommentRouter = require('./comment.route.js');

router.use('/foods',foodRouter);
router.use('/comment', CommentRouter);
router.use("/", require("./user.router.js"));

module.exports = router;
