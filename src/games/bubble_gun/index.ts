import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse } from '../lib';
import { getItems, setItemsToLocations } from './items';
import { getLocations } from './locations';

export class Game extends Adventure {
  constructor(session) {
    super(session);
    this.setName('bubble_gun');
    this.postInit = () => {
      const locations = getLocations(this);
      this.setLocation(locations.playgroundLocation);

      const items = getItems(this);
      setItemsToLocations(items, locations, this);
    };
  }

  public getWelcome() {
    return super.getWelcome(`# Welcome to Bubble Gun World`);
  }

  public lose(response) {
    const p = [
      response,
      'YOU LOST. You lost too many points!',
      snl`See ya, ${this.getPlayerName()}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }

  public win(response) {
    const p = [
      response,
      `Looks like you're a winner! Turns: ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }
}
