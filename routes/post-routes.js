const router = require('express').Router();
const { isLoggedIn, isAuthor} = require('../utils/middleware')


const catchAsync = require('../utils/catchAsync');
const postController = require('../controllers/post');

router.route('/')
    .get(catchAsync(postController.index))

router.route('/posts')
    .get(catchAsync(postController.index))
    .post(isLoggedIn,catchAsync(postController.create))

router.route('/posts/new')
    // .get(isLoggedIn,postController.renderNewPostForm)


router.route('/posts/:id')
    .get(catchAsync(postController.findOnePost))
    .put(isLoggedIn,isAuthor, catchAsync(postController.edit))
    .delete(isLoggedIn,isAuthor,catchAsync(postController.delete))


router.route('/posts/:id/edit')
    .get(isLoggedIn,isAuthor,catchAsync(postController.renderEditForm))

router.get('/:id/comments', (req,res) => {
        const {id} = req.params;
        res.redirect(`/posts/${id}`);
    })
    


module.exports = router