import { StreamChat } from "stream-chat";
import { Response } from "express";

import { getstream } from "../constants";

export const getGetstreamUserToken = (user_id: string, res: Response) => {
  const serverClient = StreamChat.getInstance(getstream.api_key, getstream.api_secret);
  // expire token in 96 hours from now
  const token = serverClient.createToken(user_id, Math.floor(Date.now() / 1000) + (60 * 60 * 96));
  res.status(200).send(token);
}
