// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse } from '../lib';
import { ELECTRONICS, MAGNET, PLAYGROUND, SOAP } from './constants';
import { getItems, setItemsToLocations } from './items';
import { getLocationsMap } from './locations';
import { Session } from '../../bot';

export class Game extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('bubble_gun');
    this.postInit = () => {
      const locationsMap = getLocationsMap(this);
      this.setLocationsMap(locationsMap);
      const locations = {
          playgroundLocation: locationsMap.get(PLAYGROUND),
          bridgeLocation: locationsMap.get(PLAYGROUND),
          electronicsLocation: locationsMap.get(ELECTRONICS),
          soapLocation: locationsMap.get(SOAP),
          magnetLocation: locationsMap.get(MAGNET),
        };

      this.setLocation(locations.playgroundLocation);

      const items = getItems(this);
      setItemsToLocations(items, locations, this);
    };
  }

  public getWelcome() {
    return super.getWelcome(`# Welcome to Bubble Gun World`);
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
      `Looks like you're a winner! Turns: ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }
}
