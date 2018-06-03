const snl = require('strip-newlines');
const { Location, LocationKeywordResponse } = require('../../../lib');
const { EAST, APPLES, YOGURT } = require('../constants');

class AppleShedLocation extends Location {
  constructor(game) {
    super({ game, name: 'Apple Store' });
    this._numApples = 100;
    this._yogurtSeen = false;
  }

  getDescription() {
    const ps = [ snl`This shed is an Apple Store. It looks like a giant, giant circle.
      Inside there are many, many shelves full of apples. It looks like there
      are exactly ${this._numApples} apples.` ];
    if (this._numApples > 0) {
      ps.push(
        snl`There's no one in the store, but there's a man out back. He looks
          inside and sees you, then he comes in and says a friendly hello.`,
        snl`"Oh, a customer! Would you like to buy an apple?" he says.`
      );
    }
    return ps.join('\n\n');
  }

  setKeywords(game) {
    this.addKeyword('EXIT', `EXIT - if you want to leave the Apple Store`, () => this.followExit(EAST));
    this.addKeyword('LOOK', `LOOK - look at the contents of the Apple Store`, () => {
      let resp;
      if (this._numApples > 0) {
        resp = new LocationKeywordResponse({
          text: `There are exactly ${this._numApples} apples on the shelves.`
        });
      } else if (!game.inInventory(YOGURT)) {
        this._yogurtSeen = true;
        this._hasYogurt = true;
        resp = new LocationKeywordResponse({
          text: snl`There are no apples on the shelves. There is nothing in the
            store. It is completely empty. Except for some yogurt. But the yogurt
            has ghosts in it.`
        });
      } else {
        resp = new LocationKeywordResponse({
          text: 'The Apple Store is completely empty.'
        });
      }
      return resp;
    });

    if (!game.inInventory(APPLES)) {
      this.addKeyword('BUY_APPLE', `BUY_APPLE - if you'd like to own one of these delicious apples.`, () => {
        this._numApples = 0;
        game.addToInventory(APPLES);
        this.removeKeyword('BUY_APPLE');
        const ps = [
          snl`"Oh, you'd like to own one of these delicious apples?" says the man. "Well, you can have one. It costs $1,000."`,
          snl`"I have no money!" You tell him.`,
          snl`"Oh, well, you can still have one apple, for free." he says.`,
          snl`"THANKS!" you say.`,
          snl`"Actually, you can have all of the apples for free." he says.`,
          'GAIN 10 POINTS',
        ];
        return new LocationKeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 10,
        });
      });
    } else if (this._yogurtSeen && this._hasYogurt) {
      this.addKeyword('BUY_YOGURT', `BUY_YOGURT - purchase the yogurt with ghosts in it.`, () => {
        game.addToInventory(YOGURT);
        this.removeKeyword('BUY_YOGURT');
        this._hasYogurt = false;
        const ps = [
          snl`"Oh, you'd like to own this yogurt?" says the man. "Well, you can have it for free, because it has ghosts in it."`,
          snl`"GHOSTS!?" You say.`,
          snl`"Yes, ghosts." he says.`,
          snl`"THANKS FOR THE GHOSTGURT!" you say.`,
          snl`"By the way, ghosts dislike being on the sun." he says.`,
          'GAIN 6 POINTS',
        ];
        return new LocationKeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 6,
        });
      });
    }
  }
}

module.exports = { AppleShedLocation };

