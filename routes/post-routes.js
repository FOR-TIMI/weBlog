const router = require('express').Router();
const { isLoggedIn} = require('../utils/middleware')

const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const postController = require('../controllers/post');
const {storage} = require('../config/cloudinary');
const upload = multer({storage});

router.route('/')
    .get(isLoggedIn, postController.index)
    .get(postController.findOnePost)
    // .post(upload.array('image'), (req,res) => {
    // })




module.exports = router