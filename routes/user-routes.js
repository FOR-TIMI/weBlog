const {User} = require('../models');
const userController = require('../controllers/users');
const router = require('express').Router();

router.route("/register")
    .get(userController.renderRegisterForm)
    .post(userController.register)


router.route('/login')
    .get(userController.renderLoginForm)
    .post()

router.get('/logout', userController.logout)


module.exports = router