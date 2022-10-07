const {Comment} =require('../models')

const commentData = [
    {
    "user_id": 1,
    "post_id": 1,
    "comment_text": "This is the first comment"
    },
    {
    "user_id": 2,
    "post_id": 1,
    "comment_text": "This is the first comment"
    }

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;