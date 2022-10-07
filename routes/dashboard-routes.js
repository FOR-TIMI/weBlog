const router = require('express').Router();
const dashBoardController = require('../controllers/dashboard-controller')
const { isLoggedIn } = require('../utils/middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/')
      .get(isLoggedIn,catchAsync(dashBoardController.index))

router.route('/posts/:id')
      .delete(isLoggedIn,catchAsync(dashBoardController.delete))






module.exports = router
