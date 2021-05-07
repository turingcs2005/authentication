const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const dbString = 'mongodb://localhost:27017/auth';
const storeOptions = {
    mongoUrl: dbString,
    collection: 'sessions',
    crypto: {
        secret: 'Las Malvinas'
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'son Argentinas',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(storeOptions),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
