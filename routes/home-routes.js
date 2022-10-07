const router = require('express').Router();
const { isLoggedIn, isAuthor} = require('../utils/middleware')
const homeController = require('../controllers/home-controller')
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(homeController.index))
    .post(isLoggedIn,catchAsync(homeController.create))

   
router.route('/login')
    .get(homeController.login)
    
router.route('/register')
    .get(homeController.register)
    
router.route('/posts/:id')
        .get(catchAsync(homeController.findOnePost))

router.route('/comments/:id')
        .delete(isLoggedIn, catchAsync(homeController.deleteComment));

module.exports = router