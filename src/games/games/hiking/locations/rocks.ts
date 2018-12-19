import * as snl from 'strip-newlines';
import { Location, parajoin } from '../../../lib';
import { Game as EscapeJail } from '../../escape_jail';
import { EAST, WEST } from '../constants';

export class RocksLocation extends Location {
  constructor(game) {
    super({ game, name: 'Rocky place' });
  }

  public getDescription(game) {
    const lns = [
      snl`There's rocks everywhere on the path here. Be careful! You could
        trip, or if you horseplay, a rock could fall on your head, or you could
        fall off the path and down a cliff.`,
      snl`If you are careful, you could cross the rocks to get to a waterfall.`,
    ];
  return parajoin(lns);
  }

  public setLocationKeywords(game) {
    const px = snl`You're a careful sort of person, so you can easily get over
      the treacherous rocks to go where you want to go.`;
    this.addKeyword('LAKE', 'Go to the lake', () => this.followExit(EAST, px));
    this.addKeyword(
      'WATERFALL',
      `Check it out, you can see a waterfall beyond the rocks`,
      () => this.followExit(WEST, px)
    );
    this.addKeyword(
      'HORSEPLAY',
      'Horseplay around on the rocks and fall down a cliff.',
      () =>
        game.branchToGame(
          EscapeJail,
          snl`You start slapping yourself in the face, and get dizzy. You can't
            control where you're going and suddenly you start to fall! You aren't
            sure what happens next, but there are a lot of thuds and bumbs. That
            goes on for a long time. Then you find yourself in a new place...`
        )
    );
  }
}
