const { Post,Comment, User } = require('../models/index')

module.exports.index = async function(req,res){
    try{
       const posts = await Post.findAll({
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

         const plainPosts = posts.map((post) =>
          post.get({ plain: true })
          );
 
     res.render('posts/index', { plainPosts, loggedIn: req.session.loggedIn })
  
    }
    catch(err){
    req
    .status(500)
    .flash("error", err)
    return
    }
 }

module.exports.login = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('users/login');
};

module.exports.register = (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('users/register');
}

module.exports.findOnePost = async function(req,res){
    try{
       const post = await Post.findOne({
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
          req.flash("error", "Oops we could not find that post")
          res.redirect('/')    
       }

       const plainPost = post.get({plain : true})
       const {user_id, loggedIn} = req.session

       res.render('posts/details',{ plainPost,loggedIn, user_id} )
    }
    catch(err){
      req.flash("error", "something went wrong with our server");
      res.redirect('/');
      return;
    }
 
 }