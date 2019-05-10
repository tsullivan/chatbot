import { AlienResponder } from './responders/alien';
import { CoinFlipResponder } from './responders/coinflip';
import { GameResponder } from './responders/play';
import { HelpResponder } from './responders/help';
import { JokeResponder } from './responders/joke';
import { NameResponder } from './responders/name';
import { NinjaFactResponder } from './responders/ninjafact';
import { RandomResponder } from './responders/random';
import { RememberResponder } from './responders/remember';
import { RepeatResponder } from './responders/repeat';
import { ResponderSet } from './keyword_responder';
import { RollResponder } from './responders/roll';
import { SayResponder } from './responders/say';
import { ScoreResponder } from './responders/score';
import { StarWarsFactResponder } from './responders/starwarsfact';
import { SuperHeroFactResponder } from './responders/superherofact';
import { WhatResponder } from './responders/what';
import { WorldFactResponder } from './responders/worldfacts';

export { keywordTester } from './keyword_tester';

export async function getResponders(): Promise<ResponderSet> {
  return {
    alien: AlienResponder,
    coinflip: CoinFlipResponder,
    help: HelpResponder,
    joke: JokeResponder,
    name: NameResponder,
    ninjafact: NinjaFactResponder,
    play: GameResponder,
    worldfact: WorldFactResponder,
    random: RandomResponder,
    remember: RememberResponder,
    repeat: RepeatResponder,
    roll: RollResponder,
    say: SayResponder,
    score: ScoreResponder,
    starwarsfact: StarWarsFactResponder,
    superherofact: SuperHeroFactResponder,
    what: WhatResponder,
  };
}

