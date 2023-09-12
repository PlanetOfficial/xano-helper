import { StreamChat } from 'stream-chat';
import { getstream } from '../constants';
import { Response } from 'express';

const getChannel = (event_id: string) => {
  const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
  return streamClient.channel(getstream.channel_type, `${getstream.event_chat_prefix}_${event_id}`);
};

const addMembers = async (event_id: string, user_ids: string[]) => {
  const channel = getChannel(event_id);
  await channel.addMembers(user_ids);
};

export const createChannel = async (user_ids: string[], event_id: string, creator_id: string, res: Response) => {
  try {
    const channelId = `${getstream.event_chat_prefix}_${event_id}`;
    const streamClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
    const channel = streamClient.channel(getstream.channel_type, channelId, {created_by_id: creator_id});
    await channel.create();
    await addMembers(event_id, user_ids);
    res.status(200).send(channelId);
  } catch (error) {
    const errorMsg = `Error creating channel: ${error} Inputs: ${JSON.stringify(user_ids)} ${event_id} ${creator_id} error: ${error}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const deleteChannel = async (event_id: string, res: Response) => {
  try {
    const channel = getChannel(event_id);
    await channel.delete();
    res.status(200).send('Channel deleted successfully!');
  } catch (error) {
    const errorMsg = `Error deleting channel: ${error} Inputs: ${event_id} error: ${error}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const addMembersWrapper = async (event_id: string, user_ids: string[], res: Response) => {
  try {
    await addMembers(event_id, user_ids);
    res.status(200).send('Members added successfully!');
  } catch (error) {
    const errorMsg = `Error adding members: ${error} Inputs: ${event_id} ${JSON.stringify(user_ids)} error:${error}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const removeMembers = async (event_id: string, user_ids: string[], res: Response) => {
  try {
    const channel = getChannel(event_id);
    await channel.removeMembers(user_ids);
    res.status(200).send('Members removed successfully.');
  } catch (error) {
    const errorMsg = `Error removing members: ${error} Inputs: ${event_id} ${JSON.stringify(user_ids)} error: ${error}`;
    res.status(500).send(errorMsg);
    console.error(errorMsg);
  }
};

export const registerDeviceToken = () => {};

export const unregisterDeviceToken = () => {};
