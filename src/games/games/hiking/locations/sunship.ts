// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, Location, parajoin } from '../../../lib';
import { EAST, UP } from '../constants';

export class SunshipLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'Sun Ship, on Earth' });
  }

  public getDescription(game: Adventure) {
    const lns = [
      snl`Pretty nice in here. Whatever alien species created this ship did a
        good job.`,
      snl`The controls here look pretty simple. There's just one big button
        that says "PUSH_ME"`,
    ];
    return parajoin(lns);
  }

  public setLocationKeywords(game: Adventure) {
    const pxUp = snl`You close your eyes, hold your breath, and slam your hand
      on the PUSH_ME button. The ship's engine's rumble and your insides suddenly
      feel like cooked noodles as the ship rises up into the sky, and KSHOOOOM!
      into space!`;
    const pxEx = snl`Hope you enjoyed your time on the sun ship. Come back
      again anytime you want to be in a sun ship!`;
    this.addKeyword(['PUSH_ME', 'PUSH_BUTTON', 'PUSH'], `Push the control button`, () =>
      this.followExit(UP, pxUp),
    );
    this.addKeyword('EXIT', `Jump out of the ship and back to the bridge`, () =>
      this.followExit(EAST, pxEx),
    );
  }
}
