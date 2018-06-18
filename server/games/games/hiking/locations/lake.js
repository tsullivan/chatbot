const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { SOUTH, NORTH, ENEMIES, CAR, APPLES } = require('../constants');

class LakeLocation extends Location {
  constructor(game) {
    super({ game, name: 'Lake' });
  }

  getDescription(game) {
    const ps = [
      snl`This lake is beautiful, but the cloudy sky gives it a grim
      appearance. This seems to be a place of battle.`,
    ];
    if (game.inInventory(ENEMIES) && !game.inInventory(CAR)) {
      ps.push(snl`There are enemies are in the lake. The shores of the lake are
        too far away from them to do anything about them, though`);
    } else if (game.inInventory(CAR)) {
      ps.push(snl`There are enemies are in the lake. You're floating over their
        heads in your flying car.`);
    } else {
      ps.push('The enemies in the lake have been defeated!');
    }
    return ps.join('\n\n');
  }

  updateState(game) {
    this.addKeyword('ROCKS', 'Go to a place with a lot of rocks', () => this.followExit(SOUTH));
    this.addKeyword(
      'BRIDGE',
      `A giant bridge looks like it crosses right over the entire lake.`,
      () => this.followExit(NORTH)
    );
    this.addKeyword('SWIM', 'Swim around in the lake', () => {
      if (game.inInventory(ENEMIES)) {
        const ps = [
          snl`As soon as you dip one toe in the water, the enemies come up and
            defeat you!`,
          'LOSE 50 points',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -50,
          isDone: true,
        });
      } else {
        const ps = [
          snl`You swim around for a little bit, but the floating corpses
            of the defeated enemies gross you out and you get out of the water
            after a little bit.`,
          'LOSE A POINT',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: -1,
        });
      }
    });

    if (game.inInventory(CAR) && game.inInventory(APPLES)) {
      this.addKeyword('THROW_APPLES', 'Throw the apples at the enemies', () => {
        game.deleteInventory(APPLES);
        game.deleteInventory(ENEMIES);
        this.removeKeyword('THROW_APPLES');
        const ps = [
          snl`You reach for an apple in your pocket, and give it a mighty hurl.
            It knocks an enemy head! That enemy becomes defeated!`,
          snl`You continue on in this manner until all enemies are defeated.
            Their corpses float amidst apples in the water of the lake.`,
          'GAIN 35 points',
        ];
        return new KeywordResponse({
          text: ps.join('\n\n'),
          changeScore: 35,
        });
      });
    }
  }
}

module.exports = { LakeLocation };
