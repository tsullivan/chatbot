import * as snl from 'strip-newlines';
import { KeywordResponse, Location } from '../../../lib';
import { DOWN, WEST } from '../constants';

export class MountainHouseLocation extends Location {
  constructor(game) {
    super({ game, name: 'Mountain House' });
  }

  public getDescription(game) {
    const ps = [
      snl`Inside the mountain house, the many windows create an atmosphere of
        light, but as it is cloudy outside, you find yourself wishing for a
        little more.`,
      snl`There's a comfy-looking bed, in case you need a rest.`,
      snl`There's a deep hole in the floor. You can't see the bottom, but you
        could fit yourself inside.`,
    ];
    return ps.join('\n\n');
  }

  public setLocationKeywords(game) {
    this.addKeyword(['OUTSIDE', 'EXIT'], `Go out to the top of the mountain`, () =>
      this.followExit(WEST)
    );
    this.addKeyword(
      ['DOWN_THE_HOLE', 'DOWN', 'HOLE'],
      `Take a look at what's down the hole`,
      () =>
        this.followExit(
          DOWN,
          snl`Fortunately, there's a ladder leading straight down the hole, so
            you don't have to jump down an unknown distance through complete
            darkness.`
        )
    );
    this.addKeyword(['SLEEP', 'BED'], `Take a rest on the comfy-looking bed`, () => {
      const ps = [
        snl`You lay down on the comfy bed and close your eyes. You let your
          mind wander. Thinking about how pretty the waterfall was, you realize
          that although you were scared initially you're feeling pretty good now.
          You think to yourself that this game is pretty awesome, even though it
          doesn't have a lot of pictures and it's mostly reading.`,
        // list the inventory
        `GAIN A POINT`,
      ];

      // stats stuff
      const { score, turns } = game;
      ps[ps.length] = `You learn some things:
- Your score is ${score}
- You've taken ${turns} turns`;

      // restore some points
      let changeScore = 0;
      const scoreDeficit = 50 - score;
      if (scoreDeficit > 0) {
        changeScore = scoreDeficit; // bump them up to 50 again
        ps[
          ps.length
        ] = `- You get ${scoreDeficit} more points from sleeping right now.`;
      }

      const items = game.getVisibleInventoryItems();
      const inventoryIndex = ps.length;
      ps[inventoryIndex] = 'Stuff you are holding:';
      items.forEach(item => {
        ps[inventoryIndex] += `\n- ${item.getName()}: ${item.getDescription()}`;
      });
      if (items.length === 0) {
        ps[inventoryIndex] += `\n- In fact you are holding nothing.`;
      }

      return new KeywordResponse({
        changeScore,
        text: ps.join('\n\n'),
      });
    });
  }
}
