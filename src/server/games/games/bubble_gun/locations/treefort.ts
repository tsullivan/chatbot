import * as snl from 'strip-newlines';
import { Location /*, KeywordResponse */ } from '../../../lib';
import { DOWN } from '../constants';

export class TreeFortLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Tree Fort' });
    this.getDescription = () => {
      return snl`This tree fort is so tall! It has a big window with a clear
        view of the entire playground.`;
    };
  }

  public setLocationKeywords(/*game*/) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(DOWN);
    });
    // use telescope, look at bridge
    // blast bubble gun
  }
}
