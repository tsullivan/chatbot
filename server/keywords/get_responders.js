function getResponders() {
  return {
    // just_dont: require('./responders/just_dont'),
    game: require('./responders/play'),
    help: require('./responders/help'),
    joke: require('./responders/joke'),
    random: require('./responders/random'),
    repeat: require('./responders/repeat'),
    say: require('./responders/say'),
    starwarsfact: require('./responders/starwarsfact'),
    superherofact: require('./responders/superherofact'),
  };
}

module.exports = { getResponders };
