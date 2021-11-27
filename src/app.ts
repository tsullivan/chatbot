import * as Rx from 'rxjs';
import { Bot } from './bot';
import type { Chat } from './bot';
import { argv } from 'yargs';
import { runServer as runWeb } from './web';

const errors$ = new Rx.Subject<Error>();
const chats$ = new Rx.Subject<Chat>();

const b = new Bot();
const log = b.getLogger(['main']);
log.debug([], 'Initializing');

Promise.resolve()
  .then(async () => {
    const { web } = argv as { web?: unknown };
    if (web !== 'false') {
      log.info(['start', 'web'], 'Starting web...');
      await runWeb(b, chats$, errors$);
    }
  })
  .then(() => {
    log.debug([], 'Ready');
  });


errors$.subscribe((e) => {
  log.error(['unknown'], e); // FIXME
});
chats$.subscribe((c) => {
  log.info(['chat time'], JSON.stringify(c)); // FIXME
});
