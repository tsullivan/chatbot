import { s, p } from '../../../lib';
import { Adventure, Location, delayAndDie } from '../../lib';
import { SOUTH } from '../constants';

export class HallwayLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'The Jail Hallway' });
  }

  public getDescription(_game: Adventure) {
    const lns = [
      s`You're outside of the jail cell in a hallway lined with many other
        jail cells. The other jail cells have people that belong here, but you
        only got here accidentally. Time to get out!`,
      s`There's a door at the end of the hallway - that must be the exit.`,
      s`Just before the door, there is a window to the outside. You can see
        that you are on the ground floor of the jail, and there is a van right
        outside. There is a guard walking towards the driver's door.`,
    ];
    return p(lns);
  }

  public setLocationKeywords(_game: Adventure) {
    this.addKeyword(
      'ESCAPE',
      `Escape down the hallway and quickly jump into the back of the van`,
      () => {
        const lns = [
          s`You sneak past the cells towards the door. Fortunately, no one sees you.`,
          s`Thinking quickly, you quietly get outside, and get into the back
            of the van before the guard sees you.`,
        ];
        return this.followExit(SOUTH, p(lns));
      },
    );

    const { keyword, description, fn } = delayAndDie();
    this.addKeyword(keyword, description, fn);
  }
}
