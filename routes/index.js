const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')

require('dotenv').config
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require('../utils/ExpressError')



const secret = process.env.SECRET || 'thiscouldbeabettersecret'
const sessionConfig = {
    secret,
    saveUninitialized: true,
    resave: false,
}
router.use(session(sessionConfig))
router.use(flash());

router.use((req, res, next) => {
  if(!['/login','/','/register'].includes(req.originalUrl)){
    req.session.returnTo = req.originalUrl;
  }
 res.locals.signedInUser = req.user;
 res.locals.success = req.flash("success");
 res.locals.error = req.flash("error");
 next();
});


router.use('/posts', postRoutes);
router.use('/', userRoutes);


 
  router.use((err, req, res, next) => {
      const { statusCode = 500 } = err;
      if (!err.message) err.message = "Oh no, Something went wrong!";
      res.status(statusCode).render("error", { err });
  });
  
  router.all("*", (req, res, next) => {
    const err = new ExpressError("Page Not Found", 404)
      next(err);
  });






module.exports = router