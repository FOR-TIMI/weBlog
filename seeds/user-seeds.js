
const { User } = require('../models')


const userData = [
    {
     username : 'chris31',
     email : 'chris@fakemail.com',
     password : 'chris12345'
    },
    {
     username : 'jamesHarding',
     email : 'james@fakemail.com',
     password : 'james12345'
    },
    {
     username : 'frank98',
     email : 'frank@fakemail.com',
     password : 'franklovesblogs'
    },
    {
     username : 'johnny',
     email : 'johnny@fakemail.com',
     password : 'youngjohnny'
    },
    {
     username : 'daniella092',
     email : 'daniella@fakemail.com',
     password : 'daniellatheblogger'
    }
]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
