const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10

class User extends Model{
  // set up method to run on instance data (per user) to check password
  async checkPassword(loginPw) {
    const result = await bcrypt.compare(loginPw, this.password)
    return result
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
        const salt = await bcrypt.genSalt(saltRounds)
       newUserData.password = await bcrypt.hash(newUserData.password, salt);
       return newUserData;
          },
  
     // set up beforeUpdate lifecycle "hook" functionality
     async beforeUpdate(updatedUserData) {
          const salt = await bcrypt.genSalt(saltRounds)
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, salt);
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