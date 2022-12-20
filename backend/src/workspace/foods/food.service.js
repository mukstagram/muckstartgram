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

    editFoodList = async ({foodId, userId, category, title, content}) => {
        //이미지 로직을 여기로 옮겨야 할듯?...

    };

    deleteFoodList = async ({foodId, userId}) => {
        const findFood = await this.foodRepository.getFood({foodId});

        if(!findFood){
            throw new ValidationError("존재하지 않는 게시물 입니다.","notFoodList")
        }else if(findFood.get({plain: true})["userId"] !== userId['userId']){
            throw new ValidationError("본인 게시글만 삭제할 수 있습니다","userError");
        }

        const result = await this.foodRepository.deleteFood({foodId});
        if(!result){
            throw new ValidationError("알수 없는 오류로 삭제를 실패 했습니다.");
        }

    };


}

module.exports = FoodService;