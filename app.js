require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { i18next, middleware } = require('./public/js/i18n');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

connectDB();

app.use(middleware.handle(i18next));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
 
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});