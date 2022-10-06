const { User, Post, Comment} = require('../models');


module.exports.index = async (req,res) => {
try{
   if(req.session.loggedIn){
    const posts = await Post.findAll({
        where: {
            user_id: req.session.user_id
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
         req.flash("error","You have no posts yet")
         return;
    }

    const plainPost = posts.map(post => post.get({plain: true}))
       res.render('dashboard/index',{
       plainPost,
       loggedIn: req.session.loggedIn,
       user_id : req.session.user_id
    })
    return;
   }
   req.flash("error", "you must sign in first")
   res.redirect('/login')

}
catch(err){
    req
    .flash("error", "something went wrong with our server")
 return 
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
