const snl = require('strip-newlines');
const { Location /*, KeywordResponse */ } = require('../../../lib');
const { NORTH, WEST } = require('../constants');

class StartLocation extends Location {
  constructor(game) {
    super({ game, name: 'Escaping from the cops station' });
  }

  getDescription() {
    const ps = [
      snl`You've just escaped from a jail. You breathe a sigh of relief because
        that part of your life is forever behind you. They'll never find you in
        these woods. Plus, you stole the jail key, because you're not a bad guy.
        You were put in jail accidentally. They made you steal the key.`,
      snl`Now, all you have to do is hike...`,
      snl`You're surrounded by trees and it's cloudy outside. To be honest,
        it's a little scary because you really don't know what's out here. And
        there's cops chasing you, but they're far behind. And you can go super fast.`,
    ];
    return ps.join('\n\n');
  }

  setKeywords(/*game*/) {
    const pxLake = snl`Your hiking adventure begins! Off to the lake we go.`;
    const pxRocks = snl`Your hiking adventure begins! Starting out with a
      scrambly feeling, you make your way over to the rocks.`;
    this.addKeyword('LAKE', `You can see a lake in one direction. It looks pretty nice.`, () =>
      this.followExit(NORTH, pxLake)
    );
    this.addKeyword(
      'ROCKS',
      `You can see precarious rocks on the trail in another direction. They look scrambly.`,
      () => this.followExit(WEST, pxRocks)
    );
  }
}

module.exports = { StartLocation };
