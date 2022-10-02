const router = require('express').Router();
const { Comment } = require('../../models');


router.route("/")
      .get()
      .post(catchAsync(userController.register))
      .delete(catchAsync(userController.register))

module.exports = router;