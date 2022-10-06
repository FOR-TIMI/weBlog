const router = require('express').Router();
const dashBoardController = require('../controllers/dashboard-controller')


router.route('/')
      .get(dashBoardController.findPostsByUser)
      .get(dashBoardController.renderNewPostForm)


router.route('/edit/:id')
      .get(dashBoardController.EditPost)



module.exports = router
