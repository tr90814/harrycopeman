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
            <link rel="apple-touch-icon" sizes="57x57" href="/fav/apple-icon-57x57.png">
            <link rel="apple-touch-icon" sizes="60x60" href="/fav/apple-icon-60x60.png">
            <link rel="apple-touch-icon" sizes="72x72" href="/fav/apple-icon-72x72.png">
            <link rel="apple-touch-icon" sizes="76x76" href="/fav/apple-icon-76x76.png">
            <link rel="apple-touch-icon" sizes="114x114" href="/fav/apple-icon-114x114.png">
            <link rel="apple-touch-icon" sizes="120x120" href="/fav/apple-icon-120x120.png">
            <link rel="apple-touch-icon" sizes="144x144" href="/fav/apple-icon-144x144.png">
            <link rel="apple-touch-icon" sizes="152x152" href="/fav/apple-icon-152x152.png">
            <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-icon-180x180.png">
            <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="96x96" href="/fav/favicon-96x96.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png">
            <link rel="manifest" href="/fav/manifest.json">
            <meta name="msapplication-TileColor" content="#ffffff">
            <meta name="msapplication-TileImage" content="/fav/ms-icon-144x144.png">
            <meta name="theme-color" content="#ffffff">
          </head>
          <body>
            <div class='c-image-container'>
              <div class='c-speech-bubble'>
                ${text}.
              </div>
            </div>
          </body>
        </html>
    `);
  });
});

// Listen
app.listen(port);
