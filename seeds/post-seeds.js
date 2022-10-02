const { Post} = require('../models');

const postData = [
    {
        title : 'Why MVC is so important',
        content: `MVC allows developers to maintain a true seperation of concers,
                 devising their code between the Model layer for data, the view layer for design,
                 and the controller layer for application logic
                 `,
        images: [
            {
              url: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1654481485/yelpCamp/v3in5dcknsbncoovc5et.jpg',
              filename: 'yelpCamp/v3in5dcknsbncoovc5et',
            },
            {
              url: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1654481486/yelpCamp/b4cvfrhxeleiot6glbum.jpg',
              filename: 'yelpCamp/b4cvfrhxeleiot6glbum',
            },
            {
              url: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1654481487/yelpCamp/tvyrpe4apn7yyxijrsmq.jpg',
              filename: 'yelpCamp/tvyrpe4apn7yyxijrsmq',
            }
          ],
        user_id: 1
    },
    {
        title : 'Authentication VS. Authorization',
        content: `There is a difference between authentication and authorization.
                  Authentication means confirmning your own identity,
                  whereas authorization means being allowed access to the system
                 `,
        user_id: 2,
        images: [
            {
              url: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1654481485/yelpCamp/v3in5dcknsbncoovc5et.jpg',
              filename: 'yelpCamp/v3in5dcknsbncoovc5et',
            }
        ],
    },
    {
        title : 'Object-Relational Mapping',
        content: `I have really loved learning about ORMs. it's erally simplified the way I create queries in SQL`,
        user_id: 4,
        images: [
            {
              url: 'https://res.cloudinary.com/yelpcampprojectimages/image/upload/v1654481485/yelpCamp/v3in5dcknsbncoovc5et.jpg',
              filename: 'yelpCamp/v3in5dcknsbncoovc5et',
            }
        ],
    }
]
const seedPosts = () =>  Post.bulkCreate(postData)

module.exports = seedPosts;