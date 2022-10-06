const { Post, User,Comment } = require('../models')

module.exports.index = async function(req,res){
   try{
      let posts = await Post.findAll({
         order: [['created_at', 'DESC']],
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
      });
        posts = posts.map((post) =>
         post.get({ plain: true })
       );
 

    res.json({ posts, loggedIn: req.session.loggedIn })
    return      
   }
   catch(err){
   req
   .status(500)
   .json({message: err})
   return
   }
}

module.exports.findOnePost = async function(req,res){
   try{
      let post = await Post.findOne({
         where : {
            id : req.params.id
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
         .json({message: "Oops we couldn't find that post!"})
         return;
      }
      res.json(post)
   }
   catch(err){
     res
     .status(500)
     .json({message: err});
   }

}

module.exports.createPost =  async (req, res) => {
try{
   const post = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id
  })
  res.json(post)
}
catch(err){
   res
   .status(500)
   .json({message: err})
}
     
};

module.exports.updatePost = async (req, res) => {
try{
   const post = await Post.update(req.body, {
      where : {
         id : req.params.id
      }
  })

  if(!post){
     res
     .status(404)
     .json({message : "No post found with this id"})
     return;
  }

  res.json(post)
}
catch(err){
   res
   .status(500)
   .json({message : err})
}
      
};

module.exports.deletePost = async(req,res) => {

try{
   const post = await Post.destroy({
      where: {
         id: req.params.id
      }
   })

   if(!post){
      res
      .status(404)
      .json({message : "No post found with this id"})
      return;
     }

   res.json(post)
}

catch(err){
   res 
   .status(500)
   .json({message:err})
}

}
