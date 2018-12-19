import { argv } from 'yargs';
import { Bot } from './lib/bot';
import { runBot as runSlack} from './slackbot';
import { runServer as runWeb } from './web';

const b = new Bot();
const log = b.getLogger(['main']);

log.debug([], 'Initializing');

if (argv.web !== 'false') {
  log.info(['start', 'web'], 'Starting web...');
  runWeb(b);
}

if (argv.slack) {
  log.info(['start', 'slack'], 'Starting slack...');
  runSlack(b);
}
