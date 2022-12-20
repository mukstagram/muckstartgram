const express = require('express');
const router = express.Router();
const FoodController = require('../workspace/foods/food.controller.js');
const foodController = new FoodController();
const CommentController = require('../workspace/comments/comment.controller.js');
const commentController = new CommentController();
const upload = require("../middlewares/awsMiddleware");

router.get('/',foodController.getFoodList);
router.post('/',upload.single('thumbnail'),foodController.createdFoodPost);
router.get('/:foodId',foodController.getFoodDetail);
router.get('/:foodId/comments',commentController.getComments);
module.exports = router;