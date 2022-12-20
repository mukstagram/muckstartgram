require('dotenv').config();
const { AuthenticationError } = require('../exceptions/index.exception');

module.exports = async (req, res, next) => {
    try {
        const authorization = req.header(process.env.COOKIE_NAME);

        if (authorization !== 'null' && authorization) {
            console.log(Boolean(authorization));
            throw new AuthenticationError(
                '이미 로그인이 되어 있습니다.',
                'badRequest'
            );
        }

        next();
    } catch (error) {
        next(error);
    }
};
