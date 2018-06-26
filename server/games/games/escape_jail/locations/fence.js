const snl = require('strip-newlines');
const { Location, KeywordResponse, delayAndDie } = require('../../../lib');

class FenceLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Jail Fence' });
    this._jumped = false;
    this._climbed = false;
  }

  getDescription() {
    const nls = [
      snl`You've just escaped from a jail. You breathe a sigh of relief because
        that part of your life is forever behind you. They'll never find you in
        these woods. Plus, you stole the jail key, because you're not a bad guy.
        You were put in jail accidentally. They made you steal the key.`,
      snl`Now, all you have to do is get over this fence...`,
      snl`To be honest, it's a little scary right now because you really don't
        know what's out here. And there's cops chasing you, but they're far
        behind. You have the Force and you can go super fast...`,
      snl`You're at the huge fence that goes all around the jail and keeps the
        prisoners inside. It's very tall and you would have to be a really good
        climber or a really good jumper, or both, to get over this thing. And you
        would have to be really really good to do it without getting noticed by a
        guard!`,
    ];
    return nls.join('\n\n');
  }

  updateState(/*game*/) {
    this.addKeyword(['JUMP_THE_FENCE', 'JUMP'], `Jump over the jail fence`, () => {
      return new KeywordResponse({
        text: snl`JUUUUMP! Oh no! The top of the fence is still too high up to jump over.`,
      });
    });
    this.addKeyword(['CLIMB_THE_FENCE', 'CLIMB'], `Climb over the jail fence`, () => {
      return new KeywordResponse({
        text: snl`CLIMB! Oh no! The top of the fence is still too high up to climb over.`,
      });
    });
    if (this._jumped && this._climbed) {
      this.addKeyword(
        ['JUMP_AND_THEN_CLIMB_THE_FENCE', 'JUMP_CLIMB'],
        `Jump and then climb over the jail fence`,
        () => {
          return new KeywordResponse({
            text: snl`JUUUUMP! Climb, climb, climb! You made it!`,
            isDone: true,
          });
        }
      );

      this.addKeyword(...delayAndDie());
    }
  }
}

module.exports = { FenceLocation };
