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

       return res.render('posts/index', { posts })
         
   }
   catch(err){
   return req.flash("error", "Something went wrong with our server");
   }
}


// module.exports.index
