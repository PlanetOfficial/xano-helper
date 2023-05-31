const express = require('express');

const { sendNotification } = require('./notifications/notificationHelpers');
const { keys } = require('./constants');

const app = express();

/**
 * requires title, body, and tokens in request
 */
app.get('/sendNotification', (req, res) => {
  const apikey = req.query.apikey;
  const title = req.query.title;
  const body = req.query.body;
  const tokens = req.query.tokens;
    
  if (title && body && tokens && apikey) {
    if (keys.includes(apikey)) {
      sendNotification(title, body, tokens, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});