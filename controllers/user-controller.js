const { json } = require('express');
const {User, Comment, Post} = require('../models');

module.exports.findAllUsers = async(req, res) => {
    try{
        const users = await User.findAll({});
        if(!users){
            res
            .status(404)
            .json({message : "There are no users yet"})
            return;
            
        }
        res.json(users)
    }
    catch(err){
        res
        .status(500)
        .json({message : err})
        return;
    }

}

module.exports.findOneUser = async(req, res) => {
    try{
        const user = await User.findOne({
            where : {
                id : req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'createdAt']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })

        if(!user){
            res
            .status(404)
            .json({message : "Couldn't find the user with that id"})
            return
        }

        res.json(user)
    }
    catch(err){
        res
        .status(500)
        .json({message : "Something went wrong with the server"})
        return
    }
}

module.exports.createUser = async(req,res) => {
    //To create a new user
try{
    await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
   
    const user = await User.findOne({
        where : {
            username : req.body.username
        }
     })
    
    
    //Password Check
     const validPassword = user && await user.checkPassword(req.body.password) 
     
     //Can't find that user
     if(!user || !validPassword){
        res
        .status(404)
        .json({message : " No user was found with this username"})
        return;
     }
    
       //store session
       req.session.save(() => {
         // declare session variables
         req.session.loggedIn = true;
         req.session.user_id = user.id;
         req.session.username = user.username;
    
          //Login successful
        //  req.flash('success', `welcome back ${user.username}!`);
        //  const redirectUrl = req.session.returnTo || '/';
        //  delete req.session.returnTo;
        //  res.redirect(redirectUrl);
        //  return
        return res.json({...req.session, user})
       });
}

catch(err){
    res
    .status(500)
    .json({message : err})

}
}

module.exports.updateUser = async(req,res) => {
   try{
     //To find user to be updated
     const user = await User.update(
        req.body,{
        individualHooks: true,
        where : {
            id : req.params.id
        }    
    })
     
    if(!user){
        res
        .status(404)
        .json({message:"couldn't find that user" })
    }

    res.json(user);
   }
   catch(err){
    res
    .status(500)
    .json({message : err})

   }

}

module.exports.delete = async(req,res) => {
    try{
        //To find user to be updated
        const user = await User.destroy({
           where : {
               id : req.params.id
           }    
       })
        
       if(!user){
           res
           .status(404)
           .json({message:"couldn't find that user" })
           return;
       }

       res.json(user)
       return;
      }
      catch(err){
       res
       .status(404)
       .json({message : err})
   
      } 
}

module.exports.login = async(req,res) => {
 const user = await User.findOne({
    where : {
        username : req.body.username
    }
 })


//Password Check
 const validPassword = user && await user.checkPassword(req.body.password) 
 
 //Can't find that user
 if(!user || !validPassword){
    res
    .status(404)
    .json({message : "No user was found with this username"})
    return;
 }

   //store session
   req.session.save(() => {
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;

    res.json({ user, message: 'You are no logged in!' });
   });

}

module.exports.logout = async(req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204)
            json({message: "Logged out successfully"})
            .end();
        })
    } else {
        res
        .status(404)
        .json({message:"You are already logged out"})
        .end();
    }
};






