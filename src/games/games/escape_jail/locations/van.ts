import * as snl from 'strip-newlines';
import { delayAndDie, Location } from '../../../lib';
import { SOUTH } from '../constants';

export class VanLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Van' });

    this.getDescription = () => snl`You're hiding in a jail van that's driving
      around the jail, making jail deliveries to the jail people.`;
  }

  public setLocationKeywords(/*game*/) {
    this.addKeyword('ESCAPE', `Escape the jail van`, () => {
      const px = snl`You sneak out of the jail van and run over to a fence.
        You're almost out of here!`;
      return this.followExit(SOUTH, px);
    });

    const { keyword, description, fn } = delayAndDie();
    this.addKeyword(keyword, description, fn);
  }
}
