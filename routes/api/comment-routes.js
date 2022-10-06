const router = require('express').Router();
const commentController =require('../../controllers/comment-controller')

router.route('/')
      .get(commentController.findAllComments)
      .post(commentController.addComment);

router.route('/:id')
      .delete(commentController.deleteComment)


module.exports = router;