const sequelize = require('../config/connection');

// const seedCategories = require('./category-seeds');
// const seedProducts = require('./product-seeds');
// const seedTags = require('./tag-seeds');
// const seedProductTags = require('./product-tag-seeds');

const seedUsers = require('./user-seeds');
const seedPosts =  require('./post-seeds');

const seedAll = async() => {
    await sequelize.sync({ force: true })
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    process.exit();
}


seedAll();