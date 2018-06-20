function getGames() {
  return {
    adventure: require('./games/adventure'),
    bubble_gun: require('./games/bubble_gun'),
    hiking: require('./games/hiking'),
    guess_number: require('./games/guess_number'),
    batman: require('./games/batman'),
  };
}
module.exports = { getGames };
