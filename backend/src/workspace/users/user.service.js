const userRepository = require('./user.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const { InvalidParamsError, ValidationError, AuthenticationError } = 
    require('../../exceptions/index.exception')

class UserService {
    constructor() {
        this.userRepository = new userRepository();
    }

    // 유저 생성 service
    createUser = async ({
        loginId, 
        password, 
        nickname 
    }) => {
        // 에러 처리
        const isExistUser = await this.userRepository.findAllPost();
        for (let user of isExistUser) {
            if (user.loginId === loginId) {
              throw new InvalidParamsError([
                '중복된 아이디입니다.',
                { type : "overlapId" }
              ])
            }
            if (user.nickname === nickname) {
              throw new InvalidParamsError(
                '중복된 닉네임입니다.',
                { type : "overlapnickname" }
                )
            }
          }


        // passwordId 양식 확인
        const pwCondition = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\=\~\₩]{8,16}$/;
        if (pwCondition.test(password) === false) {
            throw new InvalidParamsError([
                '비밀번호 양식이 맞지않습니다.', 
                { type : "invalidpassword" } 
            ]);
        };
        
        // loginId 양식 확인
        const idCondition = /^[A-Z][a-zA-Z0-9]{5,9}$/;
        if (idCondition.test(loginId) === false) {
            throw new InvalidParamsError([
                '아이디 양식이 맞지않습니다.', 
                { type : "invalidId" } 
            ]);
        };

        const signup = 
        await this.userRepository.createUser({
        loginId,
        nickname,
        password
        });
        return signup;
    };

    // loginId,password로 유저 정보 찾기 service
    findUser = async ({
        loginId, 
        password,
    }) => {
    const resultUser = 
        await this.userRepository.findUser({
            loginId, 
            password
        });
    return resultUser;
    };

    //token 생성
    createToken = async ({userId}) => {
        const token = jwt.sign(
          { userId : userId },
          process.env.SECRET_KEY,
          { expiresIn : "3d" }
        );
        return token;
      };
    

};

module.exports = UserService;