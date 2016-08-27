const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const router     = require('./startup/routes');
const auth       = require('./startup/middleware').auth;

// logging
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth);

// Mongoose setup
mongoose.connect('mongodb://localhost:27017/mail');

// Port
const port = process.env.PORT || 8080;

// Add routes
app.use('/', router);

// Listen
app.listen(port);
