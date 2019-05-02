// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Location, parajoin, Adventure } from '../../lib';

import { DOWN, EAST } from '../constants';

export class MountainLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'Top of the mountain' });
  }

  public getDescription(game: Adventure) {
    const lns = [
      snl`It was a long climb up to the really tall top of this mountain, so it
        feels so good to be up here.`,
      snl`Nearby is a blue house with a green roof. It has a lot of windows and
        only one door that is open. There is smoke coming out of the chimney.`,
    ];
    return parajoin(lns);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('WATERFALL', `To go back down to the waterfall`, () =>
      this.followExit(DOWN),
    );
    this.addKeyword('HOUSE', 'Check out the mountain house up here.', () =>
      this.followExit(EAST),
    );
  }
}
