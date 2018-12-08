import { argv } from 'yargs';
import { Bot } from './lib/bot';
import { runServer } from './server';
import { runBot } from './slackbot';

const beepBeepBeep = new Bot();

if (argv.slack) {
  runBot(beepBeepBeep);
}
if (argv.web) {
  runServer(beepBeepBeep);
}

const log = beepBeepBeep.getLogger();
log.info([], 'So far so good');
