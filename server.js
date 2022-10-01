const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const Post = require('./models/Post')
const flash = require("connect-flash");
const routes = require('./routes');
const sequelize = require('./config/connection');
const session = require("express-session");

const ExpressError = require('./utils/ExpressError')


const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'views'));

app.use(routes);







sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});