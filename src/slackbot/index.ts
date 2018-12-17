import { RTMClient, WebClient } from '@slack/client';
import { slack } from '../../config';
import { BOT_NAME } from '../constants';
import { IBot } from '../types';

async function findChannel(web: WebClient): Promise<string> {
  // @ts-ignore
  const { channels } = await web.channels.list();
  const { id: channelId } = channels.find(c => c.is_member);
  return channelId;
}

async function findBotId(web: WebClient): Promise<string> {
  const users = await web.users.list();
  // @ts-ignore
  const { id: botId } = users.members.find(u => u.name === 'beepbeepbeep' && u.is_bot === true);
  return botId;
}

export async function runBot(bot: IBot): Promise<void> {
  const log = bot.getLogger();
  log.info(['slack'], `Starting ${BOT_NAME} on Slack...`);

  // Need a web client to find a channel where the app can post a message
  const web = new WebClient(slack.token);

  const channelId = await findChannel(web);
  log.info(['slack', 'users'], `Found member channel ID: ${channelId}`);
  const botId = await findBotId(web);
  log.info(['slack', 'users'], `Found bot user ID: ${botId}`);

  // The client is initialized and then started to get an active connection to the platform
  const rtm = new RTMClient(slack.token);
  rtm.start();

  const currentTime = new Date().toTimeString();
  await rtm.sendMessage(`Hello, ${channelId} the current time is ${currentTime}`, channelId)

  rtm.on('message', (event) => {
    const { user, channel, text } = event;
    if (event.channel.indexOf('D') === 0) {
      log.debug(['slack', 'message', 'dm'], `Direct Message from ${user}: ${text}`);
    } else if (event.text.indexOf(`<@${botId}>`) > 0) {
      log.debug(['slack', 'message', 'mention'], `Mention from ${user} in ${channel}: ${text}`);
    }
  });

  /* debug */
  rtm.on('hello', (event) => {
    log.json(['slack', 'event', 'hello'], event);
  });
  rtm.on('im_close', (event) => {
    log.json(['slack', 'event', 'im_close'], event);
  });
  rtm.on('im_created', (event) => {
    log.json(['slack', 'event', 'im_craeaed'], event);
  });
  rtm.on('im_history', (event) => {
    log.json(['slack', 'event', 'im_history'], event);
  });
  rtm.on('im_marked', (event) => {
    log.json(['slack', 'event', 'im_marked'], event);
  });
  rtm.on('im_open', (event) => {
    log.json(['slack', 'event', 'im_open'], event);
  });
}
