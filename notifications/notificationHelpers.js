const admin = require('firebase-admin');

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

/**
 * sends notifications to devices with following params
 * @param {string} title 
 * @param {string} body 
 * @param {string[]} tokens 
 */
const sendNotification = async (title, body, tokens, res) => {
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
      res.status(500).send('Something went wrong1.');
    } else {
      res.status(200).send('Notifications successfully sent!');
    }
    }).catch((error) => {
      res.status(500).send('Something went wrong2.');
    });
}

module.exports = {sendNotification};