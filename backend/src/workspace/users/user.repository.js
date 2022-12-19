const { Users } = require('../../models');
const { Op } = require('sequelize');

class UserService {
    constructor() {}

    //DB에서 모든 유저 불러오기
    findAllUsers = async () => {
        const users = await Users.findAll({});
        return users;
    };

    // loginId로 DB에서 유저 정보 찾기 s
    findUser = async ({ loginId }) => {
        const resultUser = await Users.findOne({
            where: {
                [Op.or]: [{ loginId }],
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
        const singup = await Users.create({
            loginId,
            nickname,
            password,
        });
        return singup;
    };
}

module.exports = UserService;
