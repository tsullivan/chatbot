import { RTMClient, WebClient } from '@slack/client';
import { slack } from '../../config';
import { BOT_NAME } from '../constants';
import { Bot } from '../lib';
import { initRTMEvents } from './events';

async function findChannel(web: WebClient): Promise<string> {
  // @ts-ignore
  const { channels } = await web.channels.list();
  const { id: channelId } = channels.find(c => c.is_member);
  return channelId;
}

async function findBotId(web: WebClient): Promise<string> {
  const users = await web.users.list();
  // @ts-ignore
  const { id: botId } = users.members.find(
    u => u.name === 'beepbeepbeep' && u.is_bot === true
  );
  return botId;
}

export async function runBot(bot: Bot): Promise<void> {
  const log = bot.getLogger(['slack', 'runbot']);
  log.info([], `Starting ${BOT_NAME} on Slack...`);

  let channelId;
  let botId;
  try {
    // Need a web client to find a channel where the app can post a message
    const web = new WebClient(slack.token);

    channelId = await findChannel(web);
    botId = await findBotId(web);
  } catch (err) {
    log.error(['web', 'init'], err);
    throw err;
  }
  bot.setSlackChannel(channelId);
  bot.setSlackBotId(botId);
  log.info(['users-api'], `Found member channel ID: ${channelId}`);
  log.info(['users-api'], `Found bot user ID: ${botId}`);

  // The client is initialized and then started to get an active connection to the platform
  const rtm = new RTMClient(slack.token);
  try {
    await initRTMEvents(bot, rtm);
  } catch (err) {
    log.error(['rtm', 'init'], err);
    throw err;
  }
}
