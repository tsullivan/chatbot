import { RTMClient, WebClient } from '@slack/client';
import { slack } from '../../config';
import { Bot, ChatSession } from '../bot';
import { BOT_NAME } from '../constants';
import { SlackSession } from '../slackbot/lib';
import { IChatResponse } from '../types';
import { initRTMEvents } from './events';

const slackSessions = new Map(); // memory leak

interface ISlackChannel { id: string; is_member: boolean; }

async function findChannel(web: WebClient): Promise<string> {
  // @ts-ignore
  const { channels } = await web.channels.list() as { channels: ISlackChannel[] };
  const { id: channelId } = channels.find(c => c.is_member);
  return channelId;
}

async function findBotId(web: WebClient): Promise<string> {
  const users = await web.users.list();
  // @ts-ignore
  const { id: botId } = users.members.find(
    u => u.name === 'beepbeepbeep' && u.is_bot === true,
  );
  return botId;
}

export class SlackBot {
  private slackChannelId;
  private slackBotId;

  constructor(private bot: Bot) {}

  public getLogger(...args: any) {
    return this.bot.getLogger(...args);
  }

  public setSlackChannel(channelId: string) {
    this.slackChannelId = channelId;
  }
  public getSlackChannel() {
    return this.slackChannelId;
  }
  public setSlackBotId(botId: string) {
    this.slackBotId = botId;
  }
  public getSlackBotId() {
    return this.slackBotId;
  }

  public async start(): Promise<void> {
    const log = this.getLogger(['slack', 'runbot']);
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
    this.setSlackChannel(channelId);
    this.setSlackBotId(botId);
    log.info(['users-api'], `Found member channel ID: ${channelId}`);
    log.info(['users-api'], `Found bot user ID: ${botId}`);

    // The client is initialized and then started to get an active connection to the platform
    const rtm = new RTMClient(slack.token);
    try {
      await initRTMEvents(this, rtm);
    } catch (err) {
      log.error(['rtm', 'init'], err);
      throw err;
    }
  }

  public handleSlackChat(userId: string, chatBody): Promise<IChatResponse> {
    if (slackSessions.has(userId)) {
      const sess = slackSessions.get(userId);
      return this.bot.handleChat(chatBody, sess.chat);
    }

    // default, initialize
    const slackSession = new SlackSession(userId, this.bot);
    const chatSession = new ChatSession(this.bot, slackSession);

    // init as valid session
    chatSession.init({ name: userId });
    slackSession.setChatSession(chatSession);

    // memory cache
    slackSessions.set(userId, slackSession);

    const bodyForInit = {
      format: 'user',
      message: 'name',
      time: chatBody.time,
    };
    return this.bot.handleChat(bodyForInit, chatSession);
  }
}
