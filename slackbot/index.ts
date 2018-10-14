import Slackbot from 'slackbots';
import { slack } from '../config';
import { BOT_NAME } from '../constants';

export function runBot(): { bot: Slackbot; name: string; } {
  const bot = new Slackbot(slack);
  bot.on('start', () => {
      bot.postMessageToChannel('test-', 'meow!');
      console.log(`${BOT_NAME} on Slack as [${bot.name}]`); // eslint-disable-line no-console
  });

  return {
    bot,
    name: slack.name,
  };
}

// https://github.com/mishk0/slack-bot-api
// https://api.slack.com/events/app_mention
// https://sharkheads.slack.com/services/BDC8WNM8E?added=1
