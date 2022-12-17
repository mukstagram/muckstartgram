const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authorization = req.header(process.env.COOKIE_NAME);
    const [tokenType, tokenValue] = authorization.split(" ");
    
    if (tokenType !== 'Bearer') {
      return res.status(403).send({
        errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
      });
    };

    if (tokenValue === undefined) {
      return res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다1.",
      });
    }

    const userId = jwt.verify(tokenValue, process.env.SECRET_KEY);
    
    await Users.findOne({
      where: { userId },
      attributes: { exclude: ["password"] }})
      .then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다2.",
    });
  }
};