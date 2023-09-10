import { StreamChat } from 'stream-chat';
import { getstream } from '../constants';
import { Response } from 'express';

const getChannel = (event_id: number) => {
  const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
  return streamClient.channel(getstream.channel_type, `${getstream.event_chat_prefix}_${event_id}`);
}

const addMembers = async (event_id: number, user_ids: string[]) => {
  const channel = getChannel(event_id);
  await channel.addMembers(user_ids);
}

export const createChannel = async (user_ids: string[], event_id: number, creator_id: string, res: Response) => {
  try {
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    const channel = streamClient.channel(getstream.channel_type, `${getstream.event_chat_prefix}_${event_id}`, {created_by_id: creator_id});
    await channel.create();
    await addMembers(event_id, user_ids);
    res.status(200).send('Channel created successfully!');
  } catch {
    res.status(500).send('Error creating channel.');
  }
};

export const deleteChannel = async (event_id: number, res: Response) => {
  try {
    const channel = getChannel(event_id);
    await channel.delete();
    res.status(200).send('Channel deleted successfully!');
  } catch {
    res.status(500).send('Error deleting channel.');
  }
}

export const addMembersWrapper = async (event_id: number, user_ids: string[], res: Response) => {
  try {
    await addMembers(event_id, user_ids);
    res.status(200).send('Members added successfully!');
  } catch {
    res.status(500).send('Error adding members.');
  }
}

export const removeMembers = async (event_id: number, user_ids: string[], res: Response) => {
  try {
    const channel = getChannel(event_id);
    await channel.removeMembers(user_ids);
    res.status(200).send('Members added successfully.');
  } catch {
    res.status(500).send('Error removing members.');
  }
}

export const registerDeviceToken = () => {}

export const unregisterDeviceToken = () => {}
