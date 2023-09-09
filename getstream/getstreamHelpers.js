const {StreamChat} = require('stream-chat');
const {getstream} = require('../constants')

/**
 * fetches a user auth token from getstream
 * @param {string} user_id 
 * @returns {string} token
 */
const getGetstreamUserToken = (user_id, res) => {
  const serverClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
  // expire token in 96 hours from now
  const token = serverClient.createToken(user_id, Math.floor(Date.now() / 1000) + (60 * 60 * 96));
  res.status(200).send(token);
}

module.exports = {getGetstreamUserToken};