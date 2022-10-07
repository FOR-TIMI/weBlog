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
                attributes: ['id', 'comment_text', 'user_id', 'created_at'],
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

// res.json(posts)
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

module.exports.delete = async(req,res) => {

    try{
       const post = await Post.destroy({
          where: {
             id: req.params.id
          }
       })
       
       if(!post){
          req
          .flash("error", "No post found with this id")
          return;
         }

       req.flash("success","Deleted post successfully")
       res.redirect('/dashboard');
       return
    }
    
    catch(err){
       res 
       .status(500)
       .json({message:err})
    }
    
    }

