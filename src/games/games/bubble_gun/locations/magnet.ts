import { Location } from '../../../lib';
import { WEST } from '../constants';

export class MagnetLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Magnet Store' });
  }

  public getDescription(game) {
    // trigger game event on something you're holding when you walk in?
    return `Hold on to your metals, they got lots of magnets in here!`;
  }

  public setLocationKeywords(game) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(WEST);
    });
  }
}
