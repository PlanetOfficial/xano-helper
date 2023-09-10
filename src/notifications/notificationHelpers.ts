import admin from 'firebase-admin'
import { Response } from 'express'
import serviceAccount from '../../serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert({projectId: serviceAccount.project_id, clientEmail: serviceAccount.client_email, privateKey: serviceAccount.private_key})
})

export const sendNotification = async (title: string, body: string, tokens: string[], res: Response) => {
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
      res.status(400).send('Something went wrong or one or more notifications failed to send');
    } else {
      res.status(200).send('Notifications successfully sent!');
    }
    }).catch((_) => {
      res.status(500).send('Something went wrong.');
    });
}
