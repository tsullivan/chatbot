import { RTMClient } from '@slack/client';
import { RandomMessage } from '../../bot';
import { SlackBot } from '../slackbot';
import { UserFormat } from '../../types';

interface MessagePayload {
  message: string;
}

export function onMessageFactory(
  slackBot: SlackBot,
  rtm: RTMClient
): (event: any) => Promise<MessagePayload> {
  const log = slackBot.getLogger(['slack', 'onmessage']);

  return async event => {
    const { user, text, channel } = event;
    const chatBody: { format: UserFormat; message: string; time: Date } = {
      format: 'user',
      message: text,
      time: new Date(),
    };

    const isDm = channel.indexOf('D') === 0;
    const isMention = text.indexOf(`${slackBot.getSlackBotId()}`) > 0;

    let response;
    if (isDm) {
      response = await slackBot.handleSlackChat(user, chatBody);
    } else if (isMention) {
      const { slackSession } = slackBot.getSessionObjects(user);
      const rMessage = new RandomMessage(slackSession.chat, text, 'user');
      response = await rMessage.makeResponse(slackSession.chat);
    }

    if (response) {
      try {
        await rtm.sendMessage(response.message, channel);
        return response;
      } catch (err) {
        log.error(['sendMessage'], err);
        throw err;
      }
    }

    return undefined;
  };
}
