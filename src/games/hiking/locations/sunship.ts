import { s, p } from '../../../lib';
import { Adventure, Location } from '../../lib';
import { EAST, UP } from '../constants';

export class SunshipLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'Sun Ship, on Earth' });
  }

  public getDescription(_game: Adventure) {
    const lns = [
      s`Pretty nice in here. Whatever alien species created this ship did a
        good job.`,
      s`The controls here look pretty simple. There's just one big button
        that says "PUSH_ME"`,
    ];
    return p(lns);
  }

  public setLocationKeywords(_game: Adventure) {
    const pxUp = s`You close your eyes, hold your breath, and slam your hand
      on the PUSH_ME button. The ship's engine's rumble and your insides suddenly
      feel like cooked noodles as the ship rises up into the sky, and KSHOOOOM!
      into space!`;
    const pxEx = s`Hope you enjoyed your time on the sun ship. Come back
      again anytime you want to be in a sun ship!`;
    this.addKeyword(['PUSH_ME', 'PUSH_BUTTON', 'PUSH'], `Push the control button`, () =>
      this.followExit(UP, pxUp),
    );
    this.addKeyword('EXIT', `Jump out of the ship and back to the bridge`, () =>
      this.followExit(EAST, pxEx),
    );
  }
}
