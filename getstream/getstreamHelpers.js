const {StreamChat} = require('stream-chat');

/**
 * fetches a user auth token from getstream
 * @param {string} getstream_api_key 
 * @param {string} getstream_api_secret 
 * @param {string} user_id 
 */
const getGetstreamUserToken = async (getstream_api_key, getstream_api_secret, user_id, res) => {
  const serverClient = StreamChat.getInstance(getstream_api_key, getstream_api_secret);
  const token = serverClient.createToken(user_id);
  res.status(200).send(token);
}

module.exports = {getGetstreamUserToken};