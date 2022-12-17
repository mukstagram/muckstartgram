require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const authorization = req.header(process.env.COOKIE_NAME);

        if (authorization) {
        return res.status(401).send({
            errorMessage: "이미 로그인이 되어 있습니다.",
        })}
        next();
    } catch (error) {
        console.log(error)
    }
}