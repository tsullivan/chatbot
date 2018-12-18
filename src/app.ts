import { argv } from 'yargs';
import { Bot } from './lib/bot';
import { runBot as runSlack} from './slackbot';
import { runServer as runWeb } from './web';

const b = new Bot();
const log = b.getLogger(['start']);

log.debug([], 'Bot initialized');

if (argv.web !== 'false') {
  log.info(['web'], 'Starting web...');
  runWeb(b);
}

if (argv.slack) {
  log.info(['slack'], 'Starting slack...');
  runSlack(b);
}
