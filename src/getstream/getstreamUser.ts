import { StreamChat } from 'stream-chat';
import { Response } from 'express';

import { getstream } from '../constants';
import { formatUserIDsForCreation } from '../utils/misc';

export const getOrCreateUser = async (user_ids: string[], res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    await streamClient.upsertUsers(formatUserIDsForCreation(user_ids));
    res.status(200).send('Successfully added users!');
  } catch (error) {
    const errorMsg = `Failed to create users on getstream: ${error} Inputs: ${JSON.stringify(user_ids)}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const getGetstreamUserToken = (user_id: string, res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    // expire token in 96 hours from now
    const token = streamClient.createToken(user_id, Math.floor(Date.now() / 1000) + (60 * 60 * 96));
    res.status(200).send(token);
  } catch (error) {
    const errorMsg = `Failed to get getstream user token: ${error} Inputs: ${user_id}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const deleteUser = async (user_id: string, res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    await streamClient.deleteUser(user_id, {
      mark_messages_deleted: true,
      hard_delete: true,
    });
    res.status(200).send('User deleted from getstream successfully!');
  } catch (error) {
    const errorMsg = `User deletion from getstream failed: ${error} Inputs: ${user_id}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const registerDeviceToken = async (user_id: string, token: string, res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    await streamClient.addDevice(token, getstream.push_provider, user_id);
    res.status(200).send('Device token added to getstream successfully.');
  } catch (error) {
    const errorMsg = `Error registering token: ${error} Inputs: ${user_id} ${token}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};
