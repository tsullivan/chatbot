import { KeywordResponder, ResponderClass } from './keyword_responder';
import { Session } from '../bot';
import { getResponders } from './';

export async function keywordTester(
  input: string,
  chat: Session
): Promise<{ isKeyword: boolean; responder?: KeywordResponder }> {
  const responders = await getResponders();
  for (const keyword in responders) {
    if (responders.hasOwnProperty(keyword)) {
      try {
        const gameSet = await chat.getGames();
        const TestResponder: ResponderClass = responders[keyword];
        const responder: KeywordResponder = new TestResponder(input, { chat, gameSet });
        if (responder.inputMatches()) {
          return {
            isKeyword: true,
            responder,
          };
        }
      } catch (err) {
        const log = chat.getBotLogger(['keyword_tester']);
        log.error([], err);
        throw new Error('Bad keyword responder constructor: ' + keyword);
      }
    }
  }
  return { isKeyword: false };
}
