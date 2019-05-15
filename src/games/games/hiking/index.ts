// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, parajoin } from '../../lib';
import { getItems, setItemsToLocations } from './items';
import { Session } from '../../../bot';
import { getLocations } from './locations';

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
      snl`YOU LOST. You lost too many points!`,
      snl`See ya, ${this.getPlayerName()}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: parajoin(lns),
    });
  }

  public win(response: string) {
    const lns = [
      response,
      snl`Looks like you're a winner! Turns: ${this.turns} Score:
        ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: parajoin(lns),
    });
  }
}
