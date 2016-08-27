const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const router     = require('./startup/routes');
const ENV        = require('./startup/env');
const auth       = require('./startup/middleware').auth;

// App init
const app = express();

// Port
const port = process.env.PORT || 8080;

// Logging for dev
app.use(morgan('dev'));

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', auth);

// Mongoose setup
mongoose.connect(ENV.MONGODB_URI);

// Add routes
app.use('/api', router);

// Redirect
app.get('/', (req, res) => res.redirect('https://farewill.com'));

// Listen
app.listen(port);
