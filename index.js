const express = require('express');

// App init
const app = express();

// Port
const port = process.env.PORT || 8080;

app.get('*', (req, res) => res.send(`
  <!DOCTYPE html>
    <html>
      <head>
        <title>I'm harry copeman</title>
        <link rel="stylesheet" href="/assets/index.css" />
      </head>

      <body>
        <div id="root">
          <h1>Hello I'm Harry Copeman</h1>
          <img src='https://scontent-cdg2-1.cdninstagram.com/t51.2885-19/s1080x1080/16122658_568188593305661_999604250315063296_a.jpg'/>
        </div>
      </body>

      <script src="/assets/bundle.js"></script>
    </html>
`));

// Listen
app.listen(port);
