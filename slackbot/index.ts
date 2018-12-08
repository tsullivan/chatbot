import Slackbot from 'slackbots';
import { slack } from '../config';
import { BOT_NAME } from '../constants';
import { IBot } from '../types';

export function runBot(bot: IBot): { bot: Slackbot; name: string; } {
  const sbot = new Slackbot(slack);
  const log = bot.getLogger();

  sbot.on('start', () => {
      sbot.postMessageToChannel('test-', 'meow!');
      log.info([], `${BOT_NAME} on Slack as [${sbot.name}]`);
  });

  return {
    bot: sbot,
    name: slack.name,
  };
}

// https://github.com/mishk0/slack-bot-api
// https://api.slack.com/events/app_mention
// https://sharkheads.slack.com/services/BDC8WNM8E?added=1
