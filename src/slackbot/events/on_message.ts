import { RTMClient } from '@slack/client';
import { handleChat, RandomMessage } from '../../handle_chat';
import { Bot } from '../../lib';
import { ChatSession } from '../../web/session';
import { SlackSession } from '../lib';

export function onMessageFactory(bot: Bot, rtm: RTMClient) {
  const log = bot.getLogger(['slack', 'onmessage']);

  return async (event) => {
    const { user, text, channel } = event;
    const chatBody = {
      format: 'user',
      message: text,
      time: new Date(),
    };

    const isDm = event.channel.indexOf('D') === 0;
    const isMention = event.text.indexOf(`${bot.getSlackBotId()}`) > 0;

    if (isDm || isMention) {
      // TODO: signal for no session chat, instead of stub session
      const tempSlackSession = new SlackSession();
      const fooSession = new ChatSession(bot, tempSlackSession);
      fooSession.save();

      let response;
      if (isDm) {
        log.debug(['message', 'dm'], `Direct Message from ${user}`);
        response = handleChat(chatBody, fooSession);
        log.json(['message', 'handleChat'], response);
      } else {
        const rMessage = new RandomMessage(chatBody, text, 'user');
        response = rMessage.makeResponse(chatBody);
        log.debug(['message', 'mention'], `Mention from ${user} in ${channel}`);
      }

      // handle chat with possible session
      try {
        await rtm.sendMessage(response.message, channel);

        return response.message;
      } catch (err) {
        log.error(['handleChat'], err);
        throw err;
      }
    }
  };
}
