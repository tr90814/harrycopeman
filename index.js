const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// App init
const app = express();

// Port
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/*', (req, res) => {
  request.get('http://hipsterjesus.com/api/?paras=1&type=hipster-centric&html=false', (err, data) => {
    const text = err ? "I'm Harry Copeman" : JSON.parse(data.body).text.split('.')[0];

    res.send(`
      <!DOCTYPE html>
        <html>
          <head>
            <title>Harry copeman</title>
            <link rel="stylesheet" href="/main.css" />
          </head>

          <body>
            <div id="root">
              <div class='c-speech-bubble'>
                ${text}.
              </div>
            </div>
          </body>

          <script src="/main.js"></script>
        </html>
    `);
  });
});

// Listen
app.listen(port);
