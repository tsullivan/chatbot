import { KeywordResponder } from './keyword_responder';
import * as coinflip from './responders/coinflip';
import * as fact from './responders/fact';
import * as help from './responders/help';
import * as joke from './responders/joke';
import * as just_dont from './responders/just_dont';
import * as name from './responders/name';
import * as play from './responders/play';
import * as random from './responders/random';
import * as remember from './responders/remember';
import * as repeat from './responders/repeat';
import * as roll from './responders/roll';
import * as say from './responders/say';
import * as score from './responders/score';
import * as what from './responders/what';

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

export function getResponders() {
  return {
    coinflip,
    help,
    joke,
    just_dont,
    name,
    fact,
    play,
    random,
    remember,
    repeat,
    roll,
    say,
    score,
    what,
  };
}
