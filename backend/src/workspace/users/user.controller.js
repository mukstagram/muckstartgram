const UserService = require('./user.service');
require('dotenv').config({ path: '../.env' });
const { errorHandler } = require('../../middlewares/error-hander.middleware')

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    /**
     * @param {import("express").Request} req - express Request
     * @param {import("express").Response} res - express Response
     * @param {import("express").NextFunction} next - express Response
     * **/

    // 유저 생성 controller
    createUser = async (req, res) => {
        try {
            const { 
                loginId, 
                password, 
                nickname 
            } = req.body;

            await this.userService.createUser({
                loginId, 
                password, 
                nickname 
            });

             res
                .status(200)
                .json({message : "회원가입 성공", type : "sucess"});
        } catch (error) {
            res.status(500).json({ message : "dberror" });
        }
    };

    // 로그인 controller
    loginUser = async (req, res) => {
        try {
            const {
                loginId, 
                password
            } = req.body;

            const resultUser = 
                await this.userService.findUser({
                    loginId, password
                });
                
                const token = 
                    await this.userService.createToken(resultUser.userId, resultUser.nickname);

                req.get(process.env.COOKIE_NAME, `Bearer ${token}`);
                res
                    .status(200)
                    .json({token, type : "sucess"});
        } catch (error) {
            // throw new errorHandler(error)
            res.status(400).json({ 
                message: "로그인 실패",
                type : "badRequest" 
            });
        }
    }

}

module.exports = UserController;