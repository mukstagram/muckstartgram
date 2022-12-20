const FoodRepository = require('./food.repository.js');
const { FoodLists } = require('../../models');
const { ValidationError } = require("../../exceptions/index.exception");

class FoodService {
    constructor() {
        this.foodRepository = new FoodRepository(FoodLists);
    }

    createdFoodPost = async ({ category,title,content,thumbnail,userId }) => {
        await this.foodRepository.createFood({category,title,content,thumbnail,userId})
    };

    getFoodDetail = async ({ foodId }) => {
        let foodDetail = await this.foodRepository.getFood({foodId});
        if(!foodDetail){
            throw new ValidationError("존재하지 않는 게시글 입니다.","notFoodList");
        }
        return foodDetail;
    };

    getFoodList = async () => {
        return this.foodRepository.getFoodList();
    };
}

module.exports = FoodService;