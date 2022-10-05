const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const ExpressError = require('./utils/ExpressError')
const flash = require("connect-flash");


require('dotenv').config

const app = express();
const PORT = process.env.PORT || 3001;


const session = require("express-session");

const secret = process.env.SECRET || 'thiscouldbeabettersecret'

const sequelize = require('./config/connection');

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionConfig = {
    secret,
    saveUninitialized: true,
    resave: false,
    store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
      expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
    }),
    resave: false,
    proxy: true,
}
app.use(session(sessionConfig))
app.use(flash());



const hbs = exphbs.create({
  helpers: require("./utils/helpers").helpers,
});

hbs.handlebars.registerHelper( "compareUserId", function(posts){
  console.log(posts)
 })



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'views'));



app.use((req, res, next) => {
  if(!['/login','/register'].includes(req.originalUrl)){
    req.session.returnTo = req.originalUrl;
  }
 
 res.locals.success = req.flash("success");
 res.locals.error = req.flash("error");
 next();
});


app.use(routes);





app.all("*", (req, res, next) => {
  const err = new ExpressError("Page Not Found", 404)
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, Something went wrong!";
  res.status(statusCode).render("error", { err });
});









sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});