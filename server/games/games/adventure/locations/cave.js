const snl = require('strip-newlines');
const { Location } = require('../class_location');
const { LocationKeywordResponse } = require('../class_location_keyword_response');
const { WEST, WINDOW_HANDLE } = require('../constants');

class CaveLocation extends Location {
  constructor(game) {
    super({ game, name: 'Main Cave' });
    this.addFloorItem(WINDOW_HANDLE);
    this.handleSeen = false;
  }
  setDescription() {
    this.description = snl`It's unnaturally cheery in this smelly old cave.
        Probably because of the tiny village of tiny dancing skeleton hands. So
        cute! So tiny! So skeleton handsy!`;
  }
  setInstructions() {
    this.instructions = [
      'DANCE to dance with the tiny skeleton hands',
      'LOOK to look closer at the tiny village',
      'EXIT to get out of the cheery smelly old cave.'
    ];
    if (this.wasHandleSeen() && this.hasFloorItem(WINDOW_HANDLE)) {
      this.instructions.push(snl`TAKE_HANDLE to take the handle and put it
        in your pocket where it will be safe`);
    }
  }
  setKeywords(game) {
    this.addKeyword('DANCE', () => new LocationKeywordResponse({
      text: snl`The dance is beautiful, with flowing, synchronized forms.
        However, as hands have no ears, and skeleton hands are the forms that
        are dancing, there is no music. You can infer a beat, but you can not
        move your feet to synchronize in kind - as the hands also do not have
        feet and are instead dancing upon the tips of their skeleton fingers.
        You have no hope to try to participate. Just take a minute to enjoy the
        show. Or keep finding a way to rest your weary self. It's still late at
        night and you're still tired. GAIN A POINT`,
      changeScore: 1 // add a point for the heck of it
    }));

    this.addKeyword('LOOK', () => {
      const text = [];
      text.push(snl`The tiny village has a tiny hotel with tiny beds made
        for resting upon by tiny skeleton hands. It warms you heart to see, but
        it makes you no less tired and your warmed heart is at the same time
        shamed with the truthful knowledge that you can find no rest in this
        enjoyable place. The hotel roof has a weird looking pole that looks
        like a handle crank for a castle window. WEIRD, right?`);

      if (this.hasFloorItem(WINDOW_HANDLE)) {
        text.push(snl`The hotel building has a strange type of flagpole on
          the roof that looks like it can be held in a normal human hand like
          your own.`
        );

        this.handleWasSeen();
      }

      return new LocationKeywordResponse({
        text: this.getDescription(text.join(' '))
      });
    });

    if (this.wasHandleSeen() && this.hasFloorItem(WINDOW_HANDLE)) {
      this.addKeyword('TAKE_HANDLE', () => {
        game.addToInventory(WINDOW_HANDLE);
        return new LocationKeywordResponse({
          text: snl`Can you handle the handle? I guess you can. The handle
            has been taken by you.`,
          changeScore: 2
        });
      });
    }

    this.addKeyword('EXIT', () => this.followExit(WEST));
  }

  wasHandleSeen() {
    return this.handleSeen;
  }
  handleWasSeen() {
    this.handleSeen = true;
    this.updateKeywords(this.game);
  }
}

module.exports = { CaveLocation };
