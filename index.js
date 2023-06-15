const express = require('express');
const bodyParser = require('body-parser');

const { sendNotification } = require('./notifications/notificationHelpers');
const { keys } = require('./constants');

const app = express();
app.use(bodyParser.json());

/**
 * requires title, body, and tokens in request
 */
app.post('/api/sendNotification', (req, res) => {
  const {title, body, tokens, apikey} = req.body;

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