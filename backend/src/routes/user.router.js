const express = require('express');
const router = express.Router();
require('dotenv').config();

// const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');
const UserController = require('../workspace/users/user.controller');
const userController = new UserController();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

const authUserMiddleware = require('../middlewares/authUserMiddleware.js');
router.get('/login/me', authUserMiddleware, async (req, res) => {
    res.status(200).json({ user: res.locals.user });
});

module.exports = router;
