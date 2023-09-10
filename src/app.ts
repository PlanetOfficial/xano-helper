import express from 'express';
import bodyParser from 'body-parser';

import {sendNotification} from './notifications/notificationHelpers';
import { deleteUser, getGetstreamUserToken } from './getstream/getstreamUser';
import { keys } from './constants';
import { addMembersWrapper, createChannel, deleteChannel, removeMembers } from './getstream/getstreamChannels';

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

app.post('/api/getstream/deleteUser', (req, res) => {
  const {user_id, apikey} = req.body;

  if (user_id && apikey) {
    if (keys.includes(apikey)) {
      deleteUser(user_id, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/api/getstream/channel/create', (req, res) => {
  const {members, event_id, creator_id, apikey} = req.body;

  if (members && event_id && creator_id && apikey) {
    if (keys.includes(apikey)) {
      createChannel(members, event_id, creator_id, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/api/getstream/channel/delete', (req, res) => {
  const {event_id, apikey} = req.body;

  if (event_id && apikey) {
    if (keys.includes(apikey)) {
      deleteChannel(event_id, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/api/getstream/channel/addMembers', (req, res) => {
  const {event_id, new_members, apikey} = req.body;

  if (event_id && new_members && apikey) {
    if (keys.includes(apikey)) {
      addMembersWrapper(event_id, new_members, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.post('/api/getstream/channel/removeMembers', (req, res) => {
  const {event_id, members, apikey} = req.body;

  if (event_id && members && apikey) {
    if (keys.includes(apikey)) {
      removeMembers(event_id, members, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(400).send('Bad request');
  }
});

// app.post('/api/getstream/registerDeviceToken', (req, res) => {
//   const {apikey} = req.body;

//   if (&& apikey) {
//     if (keys.includes(apikey)) {
      
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   } else {
//     res.status(400).send('Bad request');
//   }
// });

// app.post('/api/getstream/unregisterDeviceToken', (req, res) => {
//   const {apikey} = req.body;

//   if (&& apikey) {
//     if (keys.includes(apikey)) {
      
//     } else {
//       res.status(401).send('Unauthorized');
//     }
//   } else {
//     res.status(400).send('Bad request');
//   }
// });

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});