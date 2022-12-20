const UserService = require('./user.service');
require('dotenv').config({ path: '../.env' });

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
    createUser = async (req, res, next) => {
        try {
            const { loginId, password, nickname } = req.body;

            await this.userService.createUser({
                loginId,
                password,
                nickname,
            });

            res.status(200).json({
                message: '회원가입 성공',
                type: 'sucess',
            });
        } catch (error) {
            next(error);
        }
    };

    // 로그인 controller
    loginUser = async (req, res, next) => {
        try {
            const { loginId, password } = req.body;

            const resultUser = await this.userService.findUser({
                loginId,
                password,
            });

            const Authorization = await this.userService.createToken(
                resultUser
            );

            req.get(process.env.COOKIE_NAME, `Bearer ${Authorization}`);
            res.header({ Authorization }).send({
                message: '로그인 성공',
                type: 'sucess',
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = UserController;
