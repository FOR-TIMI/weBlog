const {Comment} = require('../models')

/*
 Holds functions to handle all requests on a comment
*/

//function to find all comments
module.exports.findAllComments = async (req, res) => {
    try{
        const comments = await Comment.findAll({})
        if(!comments){
            res
            .status(404)
            .json({message: "There are no comments yet"})
            return;
        }

       res.json(comments)
    }

    catch(err){
        res 
        .status(500)
        .json({message : "Something went wrong with our server"})
    }
}

// function to add a comment
module.exports.addComment = async(req,res) => {
   try{
    const comment = await Comment.create({
        comment_text : req.body.comment_text,
        user_id : req.session.user_id,
        post_id : req.body.post_id
    })

    res.json(comment)
   }
   catch(err){
    res
    .status(500)
    .json({message: "Something went wrong with our server"})
   }
}

// function to delete a comment
module.exports.deleteComment = async (req,res) => {
try{
    const comment = await Comment.destroy({
        where: {
            id : req.params.id
        }
    }
)

if(!comment){
    res
    .status(404)
    .json({message : "we could not find that comment"})
}
}
catch(err){
    res
    .status(500)
    .json({message: "Something went wrong with our server"})
}
}
