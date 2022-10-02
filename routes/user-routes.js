const {User} = require('../models');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor} = require('../utils/middleware')
const userController = require('../controllers/users');
const router = require('express').Router();


router.route("/register")
    .get(userController.renderRegisterForm)
    .post(catchAsync(userController.register))


router.route('/login')
    .get(userController.renderLoginForm)
    .post(catchAsync(userController.login))

router.get('/logout', userController.logout)


module.exports = router