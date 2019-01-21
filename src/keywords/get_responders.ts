import * as coinflip from './responders/coinflip';
import * as help from './responders/help';
import * as joke from './responders/joke';
import * as just_dont from './responders/just_dont';
import * as name from './responders/name';
import * as ninjafact from './responders/ninjafact';
import * as play from './responders/play';
import * as pokemonfact from './responders/pokemonfact';
import * as random from './responders/random';
import * as remember from './responders/remember';
import * as repeat from './responders/repeat';
import * as roll from './responders/roll';
import * as say from './responders/say';
import * as score from './responders/score';
import * as starwarsfact from './responders/starwarsfact';
import * as superherofact from './responders/superherofact';
import * as what from './responders/what';

export function getResponders() {
  return {
    coinflip,
    help,
    joke,
    just_dont,
    name,
    ninjafact,
    play,
    pokemonfact,
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
