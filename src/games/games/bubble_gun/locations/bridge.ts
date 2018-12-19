import * as snl from 'strip-newlines';
import { KeywordResponse, Location } from '../../../lib';
import { NORTH } from '../constants';

export class BridgeLocation extends Location {
  private isDark: boolean = true;

  constructor(game) {
    super({ game, name: 'The Bridge Out Of Town' });
  }

  public getDescription(game) {
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
    } else {
      parts[parts.length] = snl`The power is still out all over the streets,
        but magically, the street lights are glowing! There are strange
        bubbles stuck to them which light up the whole area.`;
      parts[parts.length] = snl`Will Bubble Gun World Police accept this
        reality and decide that it's safe enough for you to cross the bridge?
        You don't want to be stuck here forever!`;
    }

    const signs = parts.length;
    parts[signs] = snl`The police have put up signs all along the bridge that say BRIDGE IS OUT!`;
    if (this.isDark) {
      parts[signs] += snl` But it is too dark to even see them.`;
    } else {
      parts[signs] += snl` The signs are clearly legible in the light of the
        magical glowing bubbles. Neat!`;
    }

    return parts.join('\n\n');
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
          return this.followExit(
            NORTH,
            snl`Bubble Gun World Police are just doing what they're told: to
              not let anyone cross. It will be safe though, because there is a
              magical eery glow coming from the bubbles you dispensed from your
              bubble gun! Rude!`,
          );
        }
      },
    );
  }

  public lightUp() {
    this.isDark = true;
  }
}
