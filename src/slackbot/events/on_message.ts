import { RTMClient } from '@slack/client';
import { RandomMessage } from '../../bot';
import { SlackBot } from '../slackbot';

interface MessagePayload {
  message: string;
}

export function onMessageFactory(
  slackBot: SlackBot,
  rtm: RTMClient,
): (event: any) => Promise<MessagePayload> {
  const log = slackBot.getLogger(['slack', 'onmessage']);

  return async event => {
    const { user, text, channel } = event;
    const chatBody = {
      format: 'user',
      message: text,
      time: new Date(),
    };

    const isDm = event.channel.indexOf('D') === 0;
    const isMention = event.text.indexOf(`${slackBot.getSlackBotId()}`) > 0;

    let response;
    if (isDm) {
      response = await slackBot.handleSlackChat(user, chatBody);
    } else {
      if (isMention) {
        const rMessage = new RandomMessage(chatBody, text, 'user');
        response = rMessage.makeResponse(chatBody);
      }
    }

    if (response) {
      try {
        await rtm.sendMessage(response.message, channel);
        return response.message;
      } catch (err) {
        log.error(['sendMessage'], err);
        throw err;
      }
    }
  };
}
