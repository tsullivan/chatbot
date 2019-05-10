import { Adventure, Location, delayAndDie } from '../../../lib';
import { SOUTH } from '../constants';

export class VanLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'The Jail Van' });
  }

  public getDescription(game: Adventure) {
    return `You're hiding in a jail van that's driving around the jail, making jail deliveries to the jail people.`;
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('ESCAPE', `Escape the jail van`, () => {
      const px = `You sneak out of the jail van and run over to a fence. You're almost out of here!`;
      return this.followExit(SOUTH, px);
    });

    const { keyword, description, fn } = delayAndDie();
    this.addKeyword(keyword, description, fn);
  }
}
