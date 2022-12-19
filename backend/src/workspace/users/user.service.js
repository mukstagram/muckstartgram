const userRepository = require('./user.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const {
    ValidationError,
    InvalidParamsError,
} = require('../../exceptions/index.exception');
const crypto = require('crypto');

class UserService {
    constructor() {
        this.userRepository = new userRepository();
    }

    //비밀번호 암호화하기
    createHashedPassword = async (password) => {
        const repassword = crypto
            .createHash('sha512')
            .update(password)
            .digest('base64');
        return repassword;
    };

    // loginId,password로 유저 정보 찾기 service
    findUser = async ({ loginId, password }) => {
        const resultUser = await this.userRepository.findUser({
            loginId,
        });

        const rePassword = await this.createHashedPassword(password);

        // 로그인 아이디 비밀번호 확인
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

        const repassword = await this.createHashedPassword(password);

        // 중복된 아이디 확인
        const isExistLoginId = await this.userRepository.findUser({
            loginId,
        });
        console.log(isExistLoginId);
        if (isExistLoginId) {
            throw new InvalidParamsError(
                '중복된 아이디입니다.',
                'overlapLoginId',
                400
            );
        }

        // 중복된 닉네임 확인
        const isExistNickname = await this.userRepository.findUserNickname({
            nickname,
        });
        if (isExistNickname) {
            throw new InvalidParamsError(
                '중복된 닉네임입니다.',
                'overlapNickname'
            );
        }

        const signup = await this.userRepository.createUser({
            loginId,
            nickname,
            password: repassword,
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
