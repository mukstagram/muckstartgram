const { Users } = require('../../models');
const { Op } = require('sequelize');

class UserService {
    constructor() {}

    //DB에서 모든 유저 불러오기
    findAllUsers = async () => {
        const users = await Users.findAll({});
        return users;
      };

    // loginId,password로 DB에서 유저 정보 찾기 s
    findUser = async ({
        userId
    }) => {
    const resultUser = await Users.findOne({
        where : {
            [Op.and]: [{loginId},{password}]
        }
    });
    return resultUser;
    };

    // 유저 생성 repository : 유저 정보 DB 저장    
    createUser = async ({
        loginId, 
        password, 
        nickname 
      }) => {
        const singup = await Users.create({
          loginId,
          nickname,
          password
        });
        return singup;
    };
};

module.exports = UserService;