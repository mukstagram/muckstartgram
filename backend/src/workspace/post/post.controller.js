const PostService = require('./post.service.js');

class PostController{
    constructor() {
        this.postService = new PostService();
    }
    createdFoodPost = async (req, res, next) => {
        try {
            const {category,title,content} = req.body;
            const thumbnail = req.file.key
            const {userId} = {userId:1}

            //이미지 가공 해줘야함
            await this.postService.createdFoodPost({category,title,content,thumbnail,userId})

            res.json({message: "생성 성공"})

        } catch (error) {
            next(error);
        }
    };

    getFoodDetail = async (req, res, next) => {
        try {
            const {foodId} = req.params;
            let result = await this.postService.getFoodDetail({foodId});


            res.json({ data: result});

        } catch (error) {
            next(error);
        }
    };

    getFoodList = async (req, res, next) => {
        try {
            const result = await this.postService.getFoodList();

            res.json({ data:result});

        } catch (error) {
            next(error);
        }
    };

}

module.exports = PostController