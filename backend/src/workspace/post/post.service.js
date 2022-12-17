const PostRepository = require('./post.repository.js');
const { FoodLists } = require('../../models');

class PostService {
    constructor() {
        this.postRepository = new PostRepository(FoodLists);
    }

    createdFoodPost = async ({ category,title,content,thumbnail,userId }) => {
        await this.postRepository.createFood({category,title,content,thumbnail,userId})
    };

    getFoodDetail = async ({ foodId }) => {
        return this.postRepository.getFood({foodId})
    };

    getFoodList = async () => {
        return this.postRepository.getFoodList();
    };
}

module.exports = PostService;