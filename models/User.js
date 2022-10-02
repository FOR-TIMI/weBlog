const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10

class User extends Model{
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

}

User.init(
    {
      // define an id column
      id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
      // define a username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [3]
        }
      }
    },
    
    {

      hooks: {
        // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
       newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);
       return newUserData;
          },
  
     // set up beforeUpdate lifecycle "hook" functionality
     async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, saltRounds);
            return updatedUserData;
          }
     }, 
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
);

module.exports = User 