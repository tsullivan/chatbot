function getGames() {
  return {
    guess_number: require('./games/guess_number'),
    batman: require('./games/batman')
  };
}

module.exports = { getGames };
