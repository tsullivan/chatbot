import { ResponderSet } from './keyword_responder';
import Alien from './alien';
import CoinFlip from './coinflip';
import Help from './help';
import Joke from './joke';
import Name from './name';
import Ninjafact from './ninjafact';
import Play from './play';
import Random from './random';
import Remember from './remember';
import Repeat from './repeat';
import Roll from './roll';
import Say from './say';
import Score from './score';
import StarwarsFact from './starwarsfact';
import SuperheroFact from './superherofact';
import What from './what';
import WorldFact from './worldfact';

export function getResponders(): ResponderSet {
  return {
    alien: Alien,
    coinflip: CoinFlip,
    help: Help,
    joke: Joke,
    name: Name,
    ninjafact: Ninjafact,
    play: Play,
    random: Random,
    remember: Remember,
    repeat: Repeat,
    roll: Roll,
    say: Say,
    score: Score,
    starwarsfact: StarwarsFact,
    superherofact: SuperheroFact,
    what: What,
    worldfact: WorldFact,
  };
}

export { keywordTester } from './keyword_tester';

