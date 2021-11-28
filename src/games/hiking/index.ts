import { Adventure, KeywordResponse } from '../lib';
import { getItems, setItemsToLocations } from './items';
import { Session } from '../../bot';
import { getLocations } from './locations';
import { s, p } from '../../lib';

export default class HikingGame extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('hiking');

    this.postInit = () => {
      const locations = getLocations(this);
      this.setLocation(locations.start);

      const items = getItems(this);
      setItemsToLocations(items, locations, this);
    };
  }

  public lose(response: string) {
    const lns = [
      response,
      s`YOU LOST. You lost too many points!`,
      s`See ya, ${this.getPlayerName()}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p(lns),
    });
  }

  public win(response: string) {
    const lns = [
      response,
      s`Looks like you're a winner! Turns: ${this.turns} Score:
        ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p(lns),
    });
  }
}
