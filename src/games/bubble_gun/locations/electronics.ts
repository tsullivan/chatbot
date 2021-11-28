import { Adventure, Location } from '../../lib';
import { EAST } from '../constants';

export class ElectronicsLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'The Electronics Store' });
  }

  public getDescription(game: Adventure) {
    return `Here at the Electronics store, their motto is: "Electronics - they're what we sell!"`;
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(EAST);
    });
    // everything else is floor item
  }
}
