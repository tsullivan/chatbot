import { Bot } from '../bot';
import { SlackBot } from './slackbot';

describe('SlackBot', () => {
  it('should wrap logger', () => {
    const b = new Bot();
    const s = new SlackBot(b);

    const log = s.getLogger(['test', 'for', 'today']);
    const { message, tags } = log.info(['welcome'], 'welcome to your log');
    expect({ message, tags }).toMatchInlineSnapshot(`
Object {
  "message": "welcome to your log",
  "tags": Array [
    "welcome",
    "test",
    "for",
    "today",
  ],
}
`);
  });
});
