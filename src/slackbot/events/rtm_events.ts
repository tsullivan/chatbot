import { RTMClient } from '@slack/client';
import { SlackBot } from '../slackbot';
import { onMessageFactory } from './on_message';

export async function initRTMEvents(slackBot: SlackBot, rtm: RTMClient) {
  const log = slackBot.getLogger(['slack', 'rtm', 'events']);
  rtm.start();

  // Do hello message
  const currentTime = new Date().toTimeString();
  await rtm.sendMessage(
    `Hello, ${slackBot.getSlackChannel()} the current time is ${currentTime}`,
    slackBot.getSlackChannel()
  );

  rtm.on('message', onMessageFactory(slackBot, rtm));

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
