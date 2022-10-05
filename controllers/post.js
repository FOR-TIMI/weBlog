const { Post, User } = require('../models')

module.exports.index = async function(req,res){
   try{
      let posts = await Post.findAll({
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
      const post = await Post.findOne({
         where : {
            id : req.params.id
         }
      })

      if(!post){
         req.flash("error", "OOps we couldn't find that post!")
         res.redirect(`/posts`);
         return
      }
       
      req.flash("success", "OOps something went wrong!")
      res.render('posts/details', { post })

   }
   catch(err){
      req.flash("error", "OOps something went wrong!")
      res.redirect(`/posts/${req.params.id}`)
   }
}
