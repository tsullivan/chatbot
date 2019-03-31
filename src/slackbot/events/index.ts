import { RTMClient } from '@slack/client';
import { SlackBot } from '../slackbot';
import { onMessageFactory } from './on_message';

export async function initRTMEvents(slackBot: SlackBot, rtm: RTMClient) {
  rtm.start();

  // Do hello message
  const currentTime = new Date().toTimeString();
  await rtm.sendMessage(
    `Hello, ${slackBot.getSlackChannel()} the current time is ${currentTime}`,
    slackBot.getSlackChannel(),
  );

  // @ts-ignore
  rtm.on('message', onMessageFactory(slackBot, rtm));
}
