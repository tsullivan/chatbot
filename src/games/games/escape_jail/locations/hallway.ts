import * as snl from 'strip-newlines';
import { delayAndDie, Location, parajoin } from '../../../lib';
import { SOUTH } from '../constants';

export class HallwayLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Hallway' });
  }

  public getDescription(game) {
    const lns = [
      snl`You're outside of the jail cell in a hallway lined with many other
        jail cells. The other jail cells have people that belong here, but you
        only got here accidentally. Time to get out!`,
      snl`There's a door at the end of the hallway - that must be the exit.`,
      snl`Just before the door, there is a window to the outside. You can see
        that you are on the ground floor of the jail, and there is a van right
        outside. There is a guard walking towards the driver's door.`,
    ];
    return parajoin(lns);
  }

  public setLocationKeywords(/*game*/) {
    this.addKeyword(
      'ESCAPE',
      `Escape down the hallway and quickly jump into the back of the van`,
      () => {
        const lns = [
          snl`You sneak past the cells towards the door. Fortunately, no one sees you.`,
          snl`Thinking quickly, you quietly get outside, and get into the back
            of the van before the guard sees you.`,
        ];
        return this.followExit(SOUTH, parajoin(lns));
      }
    );

    const { keyword, description, fn } = delayAndDie();
    this.addKeyword(keyword, description, fn);
  }
}
