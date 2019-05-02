// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, parajoin } from '../lib';
import { getItems, setItemsToLocations } from './items';
import { Session } from '../../bot';
import { getLocations } from './locations';

export class Game extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('escape_jail');

    this.postInit = () => {
      const locations = getLocations(this);
      this.setLocation(locations.cellLocation);

      const items = getItems(this);
      setItemsToLocations(items, locations, this);
    };
  }

  public getWelcome() {
    const welcome = parajoin([
      '# CRASH!!!',
      snl`Your body has tumbled down a mountainside, and
        you have crashed through the roof of a jail. Fortunately you are not
        hurt, but you are stuck in this cell! The guards don't know that you
        are not supposed to be here, and they are watching you.`,
    ]);
    return super.getWelcome(welcome);
  }

  public lose(response: string) {
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

  public win(response: string) {
    const p = [
      response,
      `Looks like have escaped from JAIL! Turns: ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }
}
