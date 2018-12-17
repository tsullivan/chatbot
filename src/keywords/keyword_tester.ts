import { KeywordResponder } from './class_keyword_responder';
import { getResponders } from './get_responders';

export function keywordTester(input, chat) {
  const responders = getResponders();
  for (const keyword in responders) {
    if (responders.hasOwnProperty(keyword)) {
      try {
        const responder: KeywordResponder = new responders[keyword].KeywordResponder(input, chat);
        if (responder.inputMatches()) {
          return {
            isKeyword: true,
            responder,
          };
        }
      } catch (err) {
        throw new Error('Bad keyword responder constructor: ' + keyword);
      }
    }
  }
  return { isKeyword: false };
}
