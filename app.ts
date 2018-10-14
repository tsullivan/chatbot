import { argv } from 'yargs';
import { runServer } from './server';
import { runBot } from './slackbot';

if (argv.slack) {
  runBot();
}
if (argv.web) {
  runServer();
}
