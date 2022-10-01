const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/', userRoutes);




module.exports = router