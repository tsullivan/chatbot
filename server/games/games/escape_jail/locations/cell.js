const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { KEY, SOUTH } = require('../constants');

class CellLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Cell' });
    this._guardsWatching = true;
    this._forceAware = false;
  }

  getDescription() {
    const desc = [
      snl`You're locked up securely in a jail cell. A hole in the ceiling marks
        where you crashed through accidentally when you got here.`,
    ];
    if (!this._forceAware) {
      desc.push(snl`There is a jail key on a far wall across the hallway from
        your jail cell.`);
    }
    return desc.join('\n\n');
  }

  setLocationKeywords(game) {
    this.addKeyword('ESCAPE', `Escape from the cell`, () => {
      if (!this._guardsWatching && game.inInventory(KEY)) {
        const px = snl`You use the key to open the cell door, and quietly walk out.`;
        return this.followExit(SOUTH, px);
      }

      if (this._guardsWatching) {
        return new KeywordResponse({
          text: 'You can not escape while the guards are watching!',
        });
      }
      if (!game.inInventory(KEY)) {
        return new KeywordResponse({
          text: 'The door is locked.',
        });
      }
    });
    if (!this._forceAware) {
      const key = game.getItemFromCollection(KEY);
      this.addKeyword(
        'TAKE_JAIL_KEY',
        `Somehow take the jail key from the wall.`,
        () => {
          this._forceAware = true;
          key.see();
          const res = [
            snl`The key is on a wall far out of reach of your cell bars.
            You have to be really sneaky to take the it. Hmm. how to do
            this?`,
            snl`You hear a voice calling to you. "Use the FORCE, ${game.getPlayerName()}."`,
            snl`Who said that? The Force? What is that??`,
          ];
          return new KeywordResponse({ text: res.join('\n\n') });
        }
      );
    }

    if (this._guardsWatching) {
      this.addKeyword('WAIT', `Wait for the guards to stop watching you.`, () => {
        this._guardsWatching = false;
        return new KeywordResponse({
          text: snl`You pretend not to notice the guards watching you. They
            watch you for a little bit, then walk away to watch other prisoners.`,
        });
      });
    } else {
      this.addKeyword(
        ['STAND_AROUND', 'WAIT'],
        snl`Stand around and let the weight of feeling of excitement, exersion,
          and curiousity resolve itself in your mind before deciding on something
          clever to do`,
        () => {
          this._guardsWatching = true;
          return new KeywordResponse({
            text: snl`You stand around, doing nothing for awhile, The guards
              come back on watch duty near your cell and start watch you some
              more.`,
          });
        }
      );
    }
  }
}

module.exports = { CellLocation };
