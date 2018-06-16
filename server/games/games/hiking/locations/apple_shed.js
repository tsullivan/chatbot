const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { EAST, APPLES, YOGURT } = require('../constants');

class AppleShedLocation extends Location {
  constructor(game) {
    super({ game, name: 'Apple Store' });
    this._numApples = 100;
    this._yogurtSeen = false;
  }

  getDescription() {
    const ps = [
      snl`This giant, giant circle in the trees at the top of the climbing
        rope. is an Apple Store. It looks like a shed.  Inside there are many,
        many shelves full of apples. It looks like there are exactly
        ${this._numApples} apples.`,
    ];
    if (this._numApples > 0) {
      ps.push(
        snl`There's no one in the store, but there's a man out back. He looks
          inside and sees you, then he comes in and says a friendly hello.`,
        snl`"Oh, a customer! Would you like to buy an apple?" he says.`
      );
    }
    return ps.join('\n\n');
  }

  setLocationKeywords(game) {
    const yogurt = game.getItemFromCollection(YOGURT);

    let pxEx;
    if (!game.inInventory(APPLES) || !game.inInventory(YOGURT)) {
      pxEx = snl`"Thanks for coming!" says the business man. "I still have a few items left for sale if
        you're ever interested!"`;
    }
    this.addKeyword('EXIT', `If you want to leave the Apple Store`, () =>
      this.followExit(EAST, pxEx)
    );
    this.addKeyword('LOOK', `Look at the contents of the Apple Store`, () => {
      let resp;
      if (this._numApples > 0) {
        resp = new KeywordResponse({
          text: `There are exactly ${this._numApples} apples on the shelves.`,
        });
      } else if (!game.inInventory(YOGURT)) {
        yogurt.see();
        this._hasYogurt = true;
        resp = new KeywordResponse({
          text: snl`There are no apples on the shelves. There is nothing in the
            store. It is completely empty. Except for some yogurt. But the yogurt
            has ghosts in it.`,
        });
      } else {
        resp = new KeywordResponse({
          text: 'The Apple Store is completely empty.',
        });
      }
      return resp;
    });

    if (!game.inInventory(APPLES)) {
      this.addKeyword('BUY_APPLE', `If you'd like to own one of these delicious apples.`, () => {
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
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 10,
        });
      });
    } else if (yogurt.isSeen() && this._hasYogurt) {
      this.addKeyword('BUY_YOGURT', `Purchase the yogurt with ghosts in it.`, () => {
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
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 6,
        });
      });
    }
  }
}

module.exports = { AppleShedLocation };
