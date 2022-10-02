const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');



// create our Post model
class Post extends Model{}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          images: {
            type: DataTypes.JSON,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          content: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
          },
          post_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'post',
              key: 'id'
            }
          },
    },
    
    //Configuration
    {
       sequelize,
       freezeTableName: true,
       underscored: true,
       modelName: 'post'
    }
);


module.exports = Post