const router= require('express').Router();
const postController = require('../../controllers/post-controller');

router.route('/')
      .get(postController.index)
      .post(postController.createPost)

router.route('/:id')
      .get(postController.findOnePost)
      .put(postController.updatePost)
      .delete(postController.deletePost)


module.exports = router