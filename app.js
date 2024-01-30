require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { i18next, middleware } = require('./public/js/i18n');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session'); 
const methodOverride = require('method-override');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(middleware.handle(i18next));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/user')); 
 
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});