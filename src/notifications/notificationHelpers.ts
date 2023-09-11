import admin from 'firebase-admin';
import { Response } from 'express';
import serviceAccount from '../../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert({projectId: serviceAccount.project_id, clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key})
});

export const sendNotification = (title: string, body: string, tokens: string[], res: Response) => {
  if (tokens.length == 0) {
    const errorMsg = 'Bad request, array of tokens should have length > 0.';
    res.status(400).send(errorMsg);
    console.error(errorMsg);
    return;
  };

  const message = {
    notification: {
      title: title,
      body: body,
    },
    tokens: tokens
  };

  admin.messaging().sendEachForMulticast(message)
    .then((response) => {
      if (!response || response.failureCount > 0) {
        const errorMsg = `Something went wrong or one or more notifications failed to send Inputs: ${title} ${body} ${JSON.stringify(tokens)}`;
        res.status(500).send(errorMsg);
        console.error(errorMsg);
      } else {
        res.status(200).send('Notifications successfully sent!');
      }
    }).catch((error) => {
      const errorMsg = `Send notification error: ${error} Inputs: ${title} ${body} ${JSON.stringify(tokens)}`;
      res.status(500).send(errorMsg);
      console.error(errorMsg);
    });
};
