const express = require('express');
const bodyParser = require('body-parser');

const { sendNotification } = require('./notifications/notificationHelpers');
const { keys } = require('./constants');
const { getGetstreamUserToken } = require('./getstream/getstreamHelpers');

const app = express();
app.use(bodyParser.json());

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

app.post('/api/getGetstreamUserToken', (req, res) => {
  const {getstream_api_key, getstream_api_secret, user_id, apikey} = req.body;

  if (getstream_api_key && getstream_api_secret && user_id && apikey) {
    if (keys.includes(apikey)) {
      getGetstreamUserToken(getstream_api_key, getstream_api_secret, user_id, res);
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