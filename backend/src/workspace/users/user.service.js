const userRepository = require('./user.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const {
    ValidationError,
    InvalidParamsError,
} = require('../../exceptions/index.exception');

class UserService {
    constructor() {
        this.userRepository = new userRepository();
    }

    // loginId,password로 유저 정보 찾기 service
    findUser = async ({ loginId, password }) => {
        const resultUser = await this.userRepository.findUser({
            loginId,
            password,
        });

        const rePassword = await this.userRepository.createHashedPassword(
            password
        );

        if (
            resultUser.loginId !== loginId ||
            resultUser.password !== rePassword
        ) {
            throw new InvalidParamsError('로그인 실패', 'badRequset', 400);
        }
        return resultUser;
    };

    // 유저 생성 service
    createUser = async ({ loginId, password, nickname }) => {
        // passwordId 양식 확인
        const pwCondition = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\=\~\₩]{8,16}$/;
        if (pwCondition.test(password) === false) {
            throw new ValidationError(
                '비밀번호 양식이 맞지않습니다.',
                'invalidPassword',
                400
            );
        }

        // loginId 양식 확인
        const idCondition = /^[A-Z][a-zA-Z0-9]{5,9}$/;
        if (idCondition.test(loginId) === false) {
            throw new ValidationError(
                '아이디 양식이 맞지않습니다.',
                'invalidLoginId',
                400
            );
        }

        const isExistLoginId = await this.userRepository.findUser({
            loginId,
            password,
        });

        const isExistNickname = await this.userRepository.findUserNickname({
            nickname,
        });

        if (isExistLoginId.loginId === loginId) {
            throw new InvalidParamsError(
                '중복된 아이디입니다.',
                'overlapLoginId'
            );
        }

        if (isExistNickname.nickname === nickname) {
            throw new InvalidParamsError(
                '중복된 닉네임입니다.',
                'overlapNickname'
            );
        }

        const signup = await this.userRepository.createUser({
            loginId,
            nickname,
            password,
        });
        return signup;
    };

    //token 생성
    createToken = async ({ userId }) => {
        const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
            expiresIn: '3d',
        });
        return token;
    };
}

module.exports = UserService;
