function getFactResponders() {
  return {
    starwarsfact: require('./responders/starwarsfact'),
    superherofact: require('./responders/superherofact'),
    pokemonfact: require('./responders/pokemonfact'),
    ninjafact: require('./responders/ninjafact'),
  };
}
function getResponders() {
  return Object.assign(
    {},
    {
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
      fact: require('./responders/fact'),
      score: require('./responders/score'),
    },
    getFactResponders
  );
}

module.exports = { getResponders, getFactResponders };
