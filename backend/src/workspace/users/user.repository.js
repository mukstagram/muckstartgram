const { Users } = require('../../models');
const { Op } = require('sequelize');
const crypto = require('crypto');

class UserService {
    constructor() {}

    //DB에서 모든 유저 불러오기
    findAllUsers = async () => {
        const users = await Users.findAll({});
        return users;
    };

    //hash생성하기
    createHashedPassword = async (password) => {
        const repassword = crypto
            .createHash('sha512')
            .update(password)
            .digest('base64');
        return repassword;
    };

    // loginId,password로 DB에서 유저 정보 찾기 s
    findUser = async ({ loginId, password }) => {
        const rePassword = await this.createHashedPassword(password);

        const resultUser = await Users.findOne({
            where: {
                [Op.or]: [{ loginId }, { password: rePassword }],
            },
        });
        return resultUser;
    };

    //nickname으로 DB에서 유저찾기
    findUserNickname = async ({ nickname }) => {
        const resultUser = await Users.findOne({
            where: { nickname },
        });
        return resultUser;
    };

    // 유저 생성 repository : 유저 정보 DB 저장
    createUser = async ({ loginId, password, nickname }) => {
        // try {
        const rePassword = await this.createHashedPassword(password);

        const singup = await Users.create({
            loginId,
            nickname,
            password: rePassword,
        });
        return singup;
    };
}

module.exports = UserService;
