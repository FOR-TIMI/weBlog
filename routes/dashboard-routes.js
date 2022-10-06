const router = require('express').Router();
const dashBoardController = require('../controllers/dashboard-controller')
const { isLoggedIn } = require('../utils/middleware');
const catchAsync = require('../utils/catchAsync');

router.route('/')
      .get(catchAsync(dashBoardController.index))


router.route('/edit/:id')
      // .get(dashBoardController.EditPost)



module.exports = router
