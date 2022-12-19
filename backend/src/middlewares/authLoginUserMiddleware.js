require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authorization = req.header(process.env.COOKIE_NAME);

        if (authorization) {
            throw new Error('이미 로그인이 되어 있습니다.', 'badRequest');
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
