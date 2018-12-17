import { argv } from 'yargs';
import { Bot } from './lib/bot';
import { runBot as runSlack} from './slackbot';
import { runServer as runWeb } from './web';

const b = new Bot();
const log = b.getLogger();

log.debug(['start'], 'Bot initialized');

if (argv.web !== 'false') {
  log.info(['web', 'start'], 'Starting web...');
  runWeb(b);
}

if (argv.slack) {
  log.info(['slack', 'start'], 'Starting slack...');
  runSlack(b);
}
