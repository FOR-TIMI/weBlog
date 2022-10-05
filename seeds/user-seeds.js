
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
    },
    {
        username : 'victoria31',
        email : 'victoria@fakemail.com',
        password : 'victoria12345'
       },
       {
        username : 'victorHarding',
        email : 'victor@fakemail.com',
        password : 'victor12345'
       },
       {
        username : 'feranmi98',
        email : 'feranmi@fakemail.com',
        password : 'feranmilovesblogs'
       },
       {
        username : 'joshua',
        email : 'joshua@fakemail.com',
        password : 'youngjoshua'
       },
       {
        username : 'cameron092',
        email : 'cameron@fakemail.com',
        password : 'camerontheblogger'
       }
]


const seedUsers = () => User.bulkCreate(userData,{individualHooks : true});

module.exports = seedUsers;
