const express = require('express');
const router = express.Router();
const foodRouter = require("./post.route.js");

router.use('/post',foodRouter);

module.exports = router;