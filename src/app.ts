import { argv } from 'yargs';
import { Bot } from './lib/bot';
import { runServer } from './server';
import { runBot } from './slackbot';

const b = new Bot();

if (argv.web !== false) {
  runServer(b);
  b.runningWeb = true;
}

if (argv.slack) {
  runBot(b);
  b.runningSlack = true;
}

const log = b.getLogger();
log.info(['start'], 'So far so good ' + JSON.stringify({
  slack: b.runningSlack,
  web: b.runningWeb,
}));
