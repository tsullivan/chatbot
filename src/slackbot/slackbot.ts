import { Bot, Session } from '../bot';
import { ChatBody, ChatResponse, UserFormat } from '../types';
import { RTMClient, WebClient } from '@slack/client';
import { BOT_NAME } from '../constants';
import { SlackSession } from '../slackbot/lib';
import { initRTMEvents } from './events';
import { slack } from '../../config';

const slackSessions = new Map(); // memory leak

interface SlackChannel {
  id: string;
  is_member: boolean;
}

async function findChannel(web: WebClient): Promise<string> {
  // @ts-ignore
  const { channels } = (await web.channels.list()) as { channels: SlackChannel[] };
  const { id: channelId } = channels.find(c => c.is_member);
  return channelId;
}

async function findBotId(web: WebClient): Promise<string> {
  const users = await web.users.list();
  // @ts-ignore
  const { id: botId } = users.members.find((u: any) => u.name === 'beepbeepbeep' && u.is_bot === true); // prettier-ignore
  return botId;
}

export class SlackBot {
  private slackChannelId: string;
  private slackBotId: string;
  private bot: Bot;

  public constructor(bot: Bot) {
    this.bot = bot;
  }

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

  public getSessionObjects(
    userId: string
  ): { chatSession: Session; slackSession: SlackSession } {
    if (slackSessions.has(userId)) {
      return slackSessions.get(userId);
    }

    // default, initialize
    const slackSession = new SlackSession(userId, this.bot);
    const chatSession = new Session(this.bot, slackSession);

    // init as valid session
    chatSession.init({ name: userId });
    slackSession.setChatSession(chatSession);

    // memory cache
    slackSessions.set(userId, slackSession);

    return {
      slackSession,
      chatSession,
    };
  }
  public handleSlackChat(userId: string, chatBody: ChatBody): Promise<ChatResponse> {
    const existingSession = slackSessions.get(userId);

    if (existingSession) {
      return this.bot.handleChat(chatBody, existingSession.chat);
    } else {
      const { chatSession: newChatSession } = this.getSessionObjects(userId);
      const bodyForInit: { format: UserFormat; message: string; time: Date } = {
        format: 'user',
        message: 'name',
        time: chatBody.time,
      };
      return this.bot.handleChat(bodyForInit, newChatSession);
    }
  }
}
