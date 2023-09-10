import express from 'express'
import bodyParser from 'body-parser'

import {sendNotification} from './notifications/notificationHelpers'
import { getGetstreamUserToken } from './getstream/getstreamUser';
import { keys } from './constants';

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

app.post('/api/getstream/getUserToken', (req, res) => {
  const {user_id, apikey} = req.body;

  if (user_id && apikey) {
    if (keys.includes(apikey)) {
      getGetstreamUserToken(user_id, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/api/getstream/channel/create', (req, res) => {
  const {members, apiKey} = req.body;
});

app.post('/api/getstream/channel/delete', (req, res) => {
  
});

app.post('/api/getstream/channel/addMembers', (req, res) => {
  
});

app.post('/api/getstream/channel/deleteMembers', (req, res) => {
  
});

app.post('/api/getstream/registerDeviceToken', (req, res) => {
  
});

app.post('/api/getstream/unregisterDeviceToken', (req, res) => {
  
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});