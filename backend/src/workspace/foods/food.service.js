const FoodRepository = require('./food.repository.js');
const { FoodLists } = require('../../models');
const { ValidationError } = require("../../exceptions/index.exception");
const { deleteImage } = require("../../middlewares/awsMiddleware.js");

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

    editFoodList = async ({foodId,userId,category, title, content,thumbnail}) => {
        const find = await this.foodRepository.getFood({foodId});
        if(!find) {
            throw new ValidationError("존재하지 않는 게시물 입니다.","notFoodList")
        }
        const findFood = find.get({plain: true});
        if(findFood["userId"] !== userId){
            throw new ValidationError("본인 게시글만 수정할 수 있습니다","userError");
        }

        await deleteImage(findFood['thumbnail']);

        await this.foodRepository.editFood({foodId,category,title,content,thumbnail})

    };

    deleteFoodList = async ({foodId, userId}) => {
        const findFood = await this.foodRepository.getFood({foodId});

        if(!findFood){
            throw new ValidationError("존재하지 않는 게시물 입니다.","notFoodList")
        }else if(findFood.get({plain: true})["userId"] !== userId){
            throw new ValidationError("본인 게시글만 삭제할 수 있습니다","userError");
        }

        await deleteImage(findFood.get({plain: true})['thumbnail']);

        await this.foodRepository.deleteFood({foodId});
    };


}

module.exports = FoodService;