const FoodService = require('./food.service.js');
const { InvalidParamsError } = require('../../exceptions/index.exception');

class FoodController {
    constructor() {
        this.foodService = new FoodService();
    }
    createdFoodPost = async (req, res, next) => {
        try {

            if(!req.file){
                throw new InvalidParamsError("이미지 업로드에 실패하였습니다.","fileError");
            }

            const { category,title,content } = req.body;
            const thumbnail = req.file.key
            const { userId } = res.locals.user

            if(!category | !title | !content | !userId){
                throw new InvalidParamsError("생성 실패", "parmasError");
            }

            await this.foodService.createdFoodPost({category,title,content,thumbnail,userId})

            res.json({message: "생성 성공"})

        } catch (error) {
            next(error);
        }
    };

    getFoodDetail = async (req, res, next) => {
        try {
            const {foodId} = req.params;
            let result = await this.foodService.getFoodDetail({foodId});

            res.json({ data: result});

        } catch (error) {
            next(error);
        }
    };

    getFoodList = async (req, res, next) => {
        try {
            const result = await this.foodService.getFoodList();

            res.json({ data:result});
        } catch (error) {
            next(error);
        }
    };

}

module.exports = FoodController