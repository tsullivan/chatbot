function getPlugins() {
  return {
    help: require('./plugins/help'),
    repeat: require('./plugins/repeat'),
    joke: require('./plugins/joke'),
    superherofact: require('./plugins/superherofact'),
    starwarsfact: require('./plugins/starwarsfact'),
    random: require('./plugins/random'),
  };
}

module.exports = { getPlugins };
