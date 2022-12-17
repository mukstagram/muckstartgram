const express = require('express');
const router = express.Router();
const PostController = require('../workspace/post/post.controller.js');
const postController = new PostController();

router.get('/list',postController.getFoodList);
router.post('/createpost',postController.createdFoodPost);
router.get('/:foodId',postController.getFoodDetail)

module.exports = router;