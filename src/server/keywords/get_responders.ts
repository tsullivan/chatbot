export function getResponders() {
  return {
    coinflip: require('./responders/coinflip'),
    help: require('./responders/help'),
    joke: require('./responders/joke'),
    just_dont: require('./responders/just_dont'),
    name: require('./responders/name'),
    ninjafact: require('./responders/ninjafact'),
    play: require('./responders/play'),
    pokemonfact: require('./responders/pokemonfact'),
    random: require('./responders/random'),
    remember: require('./responders/remember'),
    repeat: require('./responders/repeat'),
    roll: require('./responders/roll'),
    say: require('./responders/say'),
    score: require('./responders/score'),
    starwarsfact: require('./responders/starwarsfact'),
    superherofact: require('./responders/superherofact'),
    what: require('./responders/what'),
  };
}
