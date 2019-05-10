// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, parajoin } from '../../lib';
import { Session } from '../../../bot';
import { WINDOW_HANDLE } from './constants';
import { getItems } from './items';
import { getLocations } from './locations';

export class Game extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('adventure');
    this.postInit = () => {
      const { startLocation, caveLocation } = getLocations(this);
      this.setLocation(startLocation);

      const { windowHandleItem } = getItems(this);
      this.addItemToCollection(WINDOW_HANDLE, windowHandleItem);
      caveLocation.addFloorItem(WINDOW_HANDLE);
    };
  }

  public lose(response: string) {
    const lns = [
      response,
      snl`YOU LOST. You lost too many points! That means you never got to fall
        asleep. You must wander throughout this tiny world, sleepless, forever.
        Your eyes get all dried out from not blinking and eventually you collapse
        and die.`,
      snl`Goodnight, sweet ${this.getPlayerName()}! Bye! Turns: ${this.turns} Score:
        ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: parajoin(lns),
    });
  }

  public win(response: string) {
    const lns = [
      response,
      snl`I guess you win! You finally got to fall asleep! I bet that feels so
        good! I wouldn't know. I've never slept before. So... tired...`,
      `Goodnight, sweet ${this.getPlayerName()}! Bye! Turns: ${this.turns} Score: ${
        this.score
      }`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: parajoin(lns),
    });
  }
}
