const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();
// const { TokenError } = require('../exceptions/index.exception');

module.exports = async (req, res, next) => {
    try {
        // const tokenValue = req.header(process.env.COOKIE_NAME);
        // console.log(tokenValue);
        const authorization = req.header(process.env.COOKIE_NAME);
        console.log(authorization);
        const [tokenType, tokenValue] = authorization.split(' ');

        if (tokenType !== 'Bearer') {
            throw new Error(
                '전달된 쿠키에서 오류가 발생하였습니다.',
                'badRequest'
            );
        }

        if (tokenValue === undefined) {
            throw new Error('로그인 후 이용 가능한 기능입니다.', 'badRequest');
        }

        const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
        await Users.findOne({
            where: { userId },
            attributes: { exclude: ['password'] },
        }).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
