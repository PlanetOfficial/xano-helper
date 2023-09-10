import { StreamChat } from 'stream-chat';
import { Response } from 'express';

import { getstream } from '../constants';

export const getGetstreamUserToken = (user_id: string, res: Response) => {
  const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
  // expire token in 96 hours from now
  const token = streamClient.createToken(user_id, Math.floor(Date.now() / 1000) + (60 * 60 * 96));
  res.status(200).send(token);
};

export const deleteUser = async (user_id: string, res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    await streamClient.deleteUser(user_id, {
      mark_messages_deleted: true,
      hard_delete: true,
    });
    res.status(200).send('User deleted from getstream successfully!');
  } catch {
    res.status(500).send("User deletion from getstream failed.");
  }
}
