const router = require('express').Router();

const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const postController = require('../controllers/post');
const {storage} = require('../config/cloudinary');
const upload = multer({storage});

router.route('/')
    .get(postController.index)
    // .post(upload.array('image'), (req,res) => {
    // })




module.exports = router