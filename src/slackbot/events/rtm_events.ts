import { RTMClient } from '@slack/client';
import { Bot } from '../../lib';
import { onMessageFactory } from './on_message';

export async function initRTMEvents(bot: Bot, rtm: RTMClient) {
  const log = bot.getLogger(['slack', 'rtm', 'events']);
  rtm.start();

  // Do hello message
  const currentTime = new Date().toTimeString();
  await rtm.sendMessage(
    `Hello, ${bot.getSlackChannel()} the current time is ${currentTime}`,
    bot.getSlackChannel()
  );

  rtm.on('message', onMessageFactory(bot, rtm));

  /* debug */
  rtm.on('hello', event => {
    log.json(['hello'], event);
  });
  rtm.on('im_close', event => {
    log.json(['im_close'], event);
  });
  rtm.on('im_created', event => {
    log.json(['im_craeaed'], event);
  });
  rtm.on('im_history', event => {
    log.json(['im_history'], event);
  });
  rtm.on('im_marked', event => {
    log.json(['im_marked'], event);
  });
  rtm.on('im_open', event => {
    log.json(['im_open'], event);
  });
}
