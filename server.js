const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError')
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers: require("./utils/helpers").helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
        expires: 600 * 1000
    },
    resave: true,
    rolling: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(flash());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'views'));

//return To routes
app.use((req, res, next) => {
    if(!['/login','/register'].includes(req.originalUrl)){
      req.session.returnTo = req.originalUrl;
    } 
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next();
  });

// turn on routes
app.use(routes);

//fall back route
app.all("*", (req, res, next) => {
    const err = new ExpressError("Page Not Found", 404)
    next(err);
  });
  
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh no, Something went wrong!";
    res.status(statusCode).render("error", { err });
});

// turn on connection to db and server

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});