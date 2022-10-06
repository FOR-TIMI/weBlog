const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');


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
          createdAt: {
            type: DataTypes.DATE,                  
          get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY');
            }
          }
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