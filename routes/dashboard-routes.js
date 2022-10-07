const router = require('express').Router();
const dashBoardController = require('../controllers/dashboard-controller')
const { isLoggedIn } = require('../utils/middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/')
      .get(catchAsync(dashBoardController.index))
      .put(dashBoardController.EditPost)





module.exports = router
