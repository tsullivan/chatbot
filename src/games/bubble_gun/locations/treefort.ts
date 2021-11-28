import { s } from '../../../lib';
import { Adventure, Location } from '../../lib';
import { DOWN } from '../constants';

export class TreeFortLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'The Tree Fort' });
  }

  public getDescription(_game: Adventure) {
    return s`This tree fort is so tall! It has a big window with a clear
      view of the entire playground.`;
  }

  public setLocationKeywords(_game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(DOWN);
    });
    // use telescope, look at bridge
    // blast bubble gun
  }
}
