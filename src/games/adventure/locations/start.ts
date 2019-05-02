// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Location, parajoin, Adventure } from '../../lib';
import { EAST, NORTH } from '../constants';

export class StartLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'Dark Forest' });
  }

  public getDescription(game: Adventure) {
    const lns = [
      snl`It is the night time. You are outside, surrounded by dark trees, and
       you're very tired. There is a castle and a cave.`,
      snl`Which way looks to be best to find a nice comfy bed to rest? I didn't
        mean for that to rhyme.`,
    ];
    return parajoin(lns);
  }

  public setLocationKeywords() {
    this.addKeyword('CAVE', 'Go down into the cave', () => this.followExit(EAST));
    this.addKeyword('CASTLE', 'Head up to the castle.', () => this.followExit(NORTH));
  }
}
