import { Bot } from './bot';
import { SlackBot } from './slackbot';
import { argv } from 'yargs';
import { runServer as runWeb } from './web';

const b = new Bot();
const log = b.getLogger(['main']);
log.debug([], 'Initializing');

Promise.resolve()
  .then(() => b.init())
  .then(async () => {
    if (argv.web !== 'false') {
      log.info(['start', 'web'], 'Starting web...');
      await runWeb(b);
    }

    if (argv.slack) {
      log.info(['start', 'slack'], 'Starting slack...');
      const sb = new SlackBot(b);
      await sb.start();
    }
  })
  .then(() => {
    log.debug([], 'Ready');
  });
