const express    = require('express');

// App init
const app = express();

// Port
const port = process.env.PORT || 8080;

app.get('*', (req, res) => res.send('<h1>Hello world</h1>'));

// Listen
app.listen(port);
