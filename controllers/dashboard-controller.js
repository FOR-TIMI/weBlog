const { User, Post, Comment} = require('../models');


module.exports.findPostsByUser = async (req,res) => {
try{
    const posts = await Post.findAll({
        where: {
            user_id: req.session.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

    if(!posts.length){
         res
         .status(404)
         .json({message: "There are no posts by this user"})
         return;
    }

    res.json(posts)
}
catch(err){
    res
    .status(500)
    .json({message: err})
}
}

module.exports.renderNewPostForm = async(req,res) => {

 res.render('posts/new', {
   loggedIn: req.session.loggedIn
});

}

module.exports.EditPost = async(req,res) => {

    const post = await Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    
    if(!post){
        res
        .status(404)
        .json({message: "Could not find that post"})
    }
    const plainPost = post.get({plain : true});


    res.render('posts/edit', {
        plainPost,
        loggedIn:req.session.loggedIn
    })
}
