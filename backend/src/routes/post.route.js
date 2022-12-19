const express = require('express');
const router = express.Router();
const PostController = require('../workspace/post/post.controller.js');
const postController = new PostController();
const multer = require('multer');
const upload = require("../middlewares/awsMiddleware");

router.get('/list',postController.getFoodList);
router.post('/createpost',upload.single('thumbnail'),postController.createdFoodPost);
router.get('/:foodId',postController.getFoodDetail)

module.exports = router;