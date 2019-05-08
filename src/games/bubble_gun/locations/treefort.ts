// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, Location } from '../../lib';
import { DOWN } from '../constants';

export class TreeFortLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'The Tree Fort' });
  }

  public getDescription(game: Adventure) {
    return snl`This tree fort is so tall! It has a big window with a clear
      view of the entire playground.`;
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(DOWN);
    });
    // use telescope, look at bridge
    // blast bubble gun
  }
}
