const router = require('express').Router();
const userRoutes = require('./user-routes');
const ExpressError = require('../utils/ExpressError')
const flash = require('connect-flash');


// router.use(flash());


// const sessionConfig = {
//     secret,
//     saveUninitialized: true,
//     resave: false,
// }


// router.use(session(sessionConfig))


// router.use((req, res, next) => {
//     if(!['/login','/','/register'].includes(req.originalUrl)){
//       req.session.returnTo = req.originalUrl;
//     }
//    res.locals.signedInUser = req.user;
//    res.locals.success = req.flash("success");
//    res.locals.error = req.flash("error");
//    next();
//   });
  
//   router.use((err, req, res, next) => {
//       const { statusCode = 500 } = err;
//       if (!err.message) err.message = "Oh no, Something went wrong!";
//       res.status(statusCode).render("error", { err });
//   });
  
//   router.all("*", (req, res, next) => {
//     const err = new ExpressError("Page Not Found", 404)
//       next(err);
//   });

router.use('/', userRoutes);




module.exports = router