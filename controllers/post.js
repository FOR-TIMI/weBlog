const { Post, User } = require('../models')

module.exports.index = async function(req,res){
   try{
      let posts = await Post.findAll({
         order: [['created_at', 'DESC']],
         include: {
            model : User,
            attributes: ['username']
         }
      });
        posts = posts.map((post) =>
         post.get({ plain: true })
       );
 

    return res.render('posts/index', { posts, loggedIn: req.session.loggedIn })
         
   }
   catch(err){
   return req.flash("error", "Something went wrong with our server");
   }
}


module.exports.findOnePost = async function(req,res){
   try{
      let post = await Post.findOne({
         where : {
            id : req.params.id
         },
         include: {
            model : User,
            attributes: ['username']
         }
      })

      if(!post){
         req.flash("error", "Oops we couldn't find that post!")
         res.redirect(`/posts`);
         return
      }

      post = post.get({plain : true})
      const {user_id, loggedIn} = req.session

// res.json({post, user_id})
      res.render('posts/details', { post,loggedIn, user_id})
   }
   catch(err){
      req.flash("error", "Oops something went wrong")
      res.redirect(`/posts`)
   }

}
