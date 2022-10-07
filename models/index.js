const User = require('./user');
const Post = require('./post');
const Comment = require('./comment')

User.hasMany(Post, {
    foreignKey : 'user_id',
    foreignKey : 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Post.belongsTo(User, {
    foreignKey : 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})


//Comments
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

User.hasMany(Comment, {
    foreignKey : 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

Post.hasMany(Comment, {
    foreignKey : 'post_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

module.exports = { User, Post, Comment}