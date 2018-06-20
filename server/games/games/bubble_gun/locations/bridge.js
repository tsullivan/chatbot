const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { NORTH, SLINGSHOT, THROWIE } = require('../constants');

class BridgeLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Bridge Out Of Town' });
    this._isDark = true; // TODO: lighting state as hidden inventory item for global visibility
  }

  getDescription() {
    const parts = [];
    parts[parts.length] = snl`This long, long bridge carries the road over a
      very tall gorge that surrounds Bubble Gun World. It is the only way out of
      town.`;

    if (this._isDark) {
      parts[parts.length] = snl`There's no way out of town right now, Bubble
      Gun World Police have blocked the road to prevent anyone from using the
      road. A power outage in the streets has caused all the street lights to
      turn off in this area. The Police are saying it's too dark and unsafe to
      let anyone try to cross.`;
    }

    const signs = parts.length;
    parts[signs] = snl`The police have put up signs all along the bridge that
      say BRIDGE IS OUT!`;
    if (this._isDark) {
      parts[signs] += snl` But it is too dark to even see them.`;
    } else {
      parts[signs] += snl` The LEDs stuck to the signs are the only way to even
        see them!`;
      parts[parts.length] = snl`Hey, you can see the way across the bridge
        safely now, because of your LEDs!`;
    }

    return parts.join('\n\n');
  }

  updateState(game) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(NORTH);
    });
    // try to cross
    this.addKeyword(
      'CROSS_BRIDGE',
      'Walk over the long, long bridge out of Bubble Gun World',
      () => {
        if (this._isDark) {
          return new KeywordResponse({
            text: snl`The police officers assigned to watch the road here see
              you try to cross, and they don't let you.`,
          });
        } else {
          // distract the police first?
          return this.followExit(
            NORTH,
            snl`The police officers let you cross over since you helped light
              up the bridge and make it safe!`
          );
        }
      }
    );
    if (game.inInventory(SLINGSHOT) && game.inInventory(THROWIE)) {
      // slingshot leds to light up the road
      this.addKeyword('SLINGSHOT_THE_THROWIE', '', () => {
        return new KeywordResponse({
          text: `This command is broken right now.`,
        });
      });
    }
  }
}

module.exports = { BridgeLocation };
