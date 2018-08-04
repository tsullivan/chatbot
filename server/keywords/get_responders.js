function getResponders() {
  return {
    just_dont: require('./responders/just_dont'),
    play: require('./responders/play'),
    help: require('./responders/help'),
    joke: require('./responders/joke'),
    random: require('./responders/random'),
    repeat: require('./responders/repeat'),
    say: require('./responders/say'),
    name: require('./responders/name'),
    coinflip: require('./responders/coinflip'),
    remember: require('./responders/remember'),
    roll: require('./responders/roll'),
    score: require('./responders/score'),
  };
}

module.exports = { getResponders };
