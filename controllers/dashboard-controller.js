const { User, Post, Comment} = require('../models');

/*
Controller functions to handle all requests from the /dashboard route
*/
module.exports.index = async (req,res) => {
try{
   // TO check if the user is loggedIn
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

    // To parse the response data to plain form so handlebars can access it
    const plainPost = posts.map(post => post.get({plain: true}))
    
    // To render the dashbord page
       res.render('dashboard/index',{
       plainPost,
       loggedIn: req.session.loggedIn,
       user_id : req.session.user_id
    })
    return;
   }
   //If the user is not signed in, an alert message is sent and the user is redirected to the login page
   req.flash("error", "you must sign in first")
   res.redirect('/login')

}
   
   //if something goes wrong with the server, then we flash the messagein form of an alert
catch(err){
    req
    .flash("error", "something went wrong with our server")
 return 
}
}


/*
 To handle delete requests on posts owned by users
*/
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

