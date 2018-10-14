import * as snl from 'strip-newlines';
import { KeywordResponse, Location } from '../../../lib';
import { NORTH } from '../constants';

export class BridgeLocation extends Location {
  private isDark: boolean;

  constructor(game) {
    super({ game, name: 'The Bridge Out Of Town' });
    this.isDark = true;

    this.getDescription = () => {
      const parts = [];
      parts[parts.length] = snl`This long, long bridge carries the road over a
        very tall gorge that surrounds Bubble Gun World. It is the only way out
        of town.`;

      if (this.isDark) {
        parts[parts.length] = snl`There's no way out of town right now, Bubble
          Gun World Police have blocked the road to prevent anyone from using the
          road. A power outage in the streets has caused all the street lights to
          turn off in this area. The Police are saying it's too dark and unsafe to
          let anyone try to cross.`;
      }

      const signs = parts.length;
      parts[signs] = snl`The police have put up signs all along the bridge that say BRIDGE IS OUT!`;
      if (this.isDark) {
        parts[signs] += snl` But it is too dark to even see them.`;
      } else {
        parts[signs] += snl` The LEDs stuck to the signs are the only way to even see them!`;
        parts[parts.length] = snl`Hey, you can see the way across the bridge safely now, because of your LEDs!`;
      }

      return parts.join('\n\n');
    };
  }

  public setLocationKeywords(game) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(NORTH);
    });
    // try to cross
    this.addKeyword(
      'CROSS_BRIDGE',
      'Walk over the long, long bridge out of Bubble Gun World',
      () => {
        if (this.isDark) {
          return new KeywordResponse({
            text: snl`The police officers assigned to watch the road here see
              you try to cross, and they don't let you.`,
          });
        } else {
          // distract the police first?
          return this.followExit(
            NORTH,
            snl`The police officers let you cross over since you helped light
              up the bridge and make it safe!`,
          );
        }
      },
    );
  }
}
