function getGames() {
  return {
    guess_number: require('./games/guess_number')
  };
}

module.exports = { getGames };
