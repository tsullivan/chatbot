const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { WEST, WINDOW_HANDLE } = require('../constants');

class CaveLocation extends Location {
  constructor(game) {
    super({ game, name: 'Cheery Cave' });
    this.addFloorItem(WINDOW_HANDLE);
    this._handleSeen = false;
    this._danced = false;
  }

  getDescription() {
    return snl`It's unnaturally cheery in this smelly old cave. Probably
      because of the tiny village of tiny dancing skeleton hands. So cute! So
      tiny! So skeleton handsy!`;
  }

  setKeywords() {
    const p = [
      snl`The dance is beautiful, with flowing, synchronized forms.
        However, as hands have no ears, and skeleton hands are the forms that
        are dancing, there is no music. You can infer a beat, but you can not
        move your feet to synchronize in kind - as the hands also do not have
        feet and are instead dancing upon the tips of their skeleton fingers.
        You have no hope to try to participate. Just take a minute to enjoy the
        show. Or keep finding a way to rest your weary self. It's still late at
        night and you're still tired.`,
      'GAIN A POINT'
    ];
    if (!this._danced) {
      this.addKeyword(
        'DANCE',
        'Dance with the tiny skeleton hands',
        () => {
          this._danced = true;
          this.removeKeyword('DANCE');
          return new LocationKeywordResponse({
            text: p.join('\n\n'),
            changeScore: 1 // add a point for the heck of it
          });
        }
      );
    }

    this.addKeyword('LOOK', 'Look closer at the tiny village', () => {
      const p = [];
      p.push(snl`The tiny village has a tiny hotel with tiny beds made
        for resting upon by tiny skeleton hands. It warms you heart to see, but
        it makes you no less tired and your warmed heart is at the same time
        shamed with the truthful knowledge that you can find no rest in this
        enjoyable place.`);

      if (this.hasFloorItem(WINDOW_HANDLE)) {
        p.push(snl`The tiny hotel building has a strange type of flagpole
          on the roof that looks like maybe a crank handle for a window. Maybe
          a castle window(s). However, it might be impossible to know for sure
          if that's what it really is, because this game is very limited. The
          crank handle to open or close castle windows might just be for
          decoration. That would be too bad.`);
        this._handleSeen = true;
      }

      return new LocationKeywordResponse({
        text: p.join('\n\n')
      });
    });

    if (this._handleSeen && this.hasFloorItem(WINDOW_HANDLE)) {
      this.addKeyword(
        'TAKE_HANDLE',
        'Take the handle and put it in your pocket where it will be safe',
        () => {
          this.game.addToInventory(WINDOW_HANDLE);
          this.removeFloorItem(WINDOW_HANDLE);
          this.removeKeyword('TAKE_HANDLE');

          return new LocationKeywordResponse({
            text: snl`Can you handle the handle? I guess you can. The handle
              has been taken by you.`,
            changeScore: 2
          });
        }
      );
    }

    this.addKeyword(
      'EXIT',
      'Get out of the cheery smelly old cave.',
      () => this.followExit(WEST)
    );
  }
}

module.exports = { CaveLocation };
