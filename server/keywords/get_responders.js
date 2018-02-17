function getResponders() {
  return {
    help: require('./responders/help'),
    repeat: require('./responders/repeat'),
    joke: require('./responders/joke'),
    superherofact: require('./responders/superherofact'),
    starwarsfact: require('./responders/starwarsfact'),
    random: require('./responders/random'),
    // just_dont: require('./responders/just_dont'),
    game: require('./responders/play'),
  };
}

module.exports = { getResponders };
