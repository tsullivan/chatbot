function getGames() {
  return {
    adventure: require('./games/adventure'),
    hiking: require('./games/hiking'),
    guess_number: require('./games/guess_number'),
    batman: require('./games/batman')
  };
}
module.exports = { getGames };
