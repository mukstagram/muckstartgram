require('dotenv').config();
const { TokenError } = require('../exceptions/index.exception');

module.exports = async (req, res, next) => {
    try {
        const authorization = req.header.token;

        if (authorization) {
            throw new TokenError('이미 로그인이 되어 있습니다.', 'badRequest');
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
