import { WebClient as SlackWebClient } from '@slack/client';
import { slack, slackPostParams } from '../../config';
import { BOT_NAME } from '../constants';
import { IBot } from '../types';

export async function runBot(bot: IBot): Promise<SlackWebClient> {
  const sweb = new SlackWebClient(slack.token);
  const log = bot.getLogger();

  log.info(['slack'], `Starting ${BOT_NAME} on Slack...`);

	await sweb.chat.postMessage({
		channel: appHome.id,
		text: `The current time is ${currentTime}`,
	});

  return sweb;
}

// https://github.com/mishk0/slack-bot-api
// https://api.slack.com/events/app_mention
// https://sharkheads.slack.com/services/BDC8WNM8E?added=1
//
