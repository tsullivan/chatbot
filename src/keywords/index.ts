import { KeywordResponder } from './keyword_responder';
import * as coinflip from './responders/coinflip';
import * as help from './responders/help';
import * as joke from './responders/joke';
import * as just_dont from './responders/just_dont';
import * as name from './responders/name';
import * as ninjafact from './responders/ninjafact';
import * as play from './responders/play';
import * as random from './responders/random';
import * as remember from './responders/remember';
import * as repeat from './responders/repeat';
import * as roll from './responders/roll';
import * as say from './responders/say';
import * as score from './responders/score';
import * as starwarsfact from './responders/starwarsfact';
import * as superherofact from './responders/superherofact';
import * as what from './responders/what';
import * as worldfact from './responders/worldfacts';

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
    ninjafact,
    play,
    worldfact,
    random,
    remember,
    repeat,
    roll,
    say,
    score,
    starwarsfact,
    superherofact,
    what,
  };
}
