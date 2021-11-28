import { Session } from '../../bot';
import { p, s } from '../../lib';
import { Adventure, KeywordResponse } from '../lib';
import { getItems, setItemsToLocations } from './items';
import { getLocations } from './locations';

export default class EscapeJailGame extends Adventure {
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
    const welcome = p([
      '# CRASH!!!',
      s`Your body has tumbled down a mountainside, and
        you have crashed through the roof of a jail. Fortunately you are not
        hurt, but you are stuck in this cell! The guards don't know that you
        are not supposed to be here, and they are watching you.`,
    ]);
    return super.getWelcome(welcome);
  }

  public lose(response: string) {
    const lose = [
      response,
      'YOU LOST. You lost too many points!',
      s`See ya, ${this.getPlayerName()}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: lose.join('\n\n'),
    });
  }

  public win(response: string) {
    const win = [
      response,
      `Looks like have escaped from JAIL! Turns: ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: win.join('\n\n'),
    });
  }
}
