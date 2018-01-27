function getResponders() {
  return {
    help: require('./responders/help'),
    repeat: require('./responders/repeat'),
    joke: require('./responders/joke'),
    superherofact: require('./responders/superherofact'),
    starwarsfact: require('./responders/starwarsfact'),
    random: require('./responders/random'),
  };
}

module.exports = { getResponders };
