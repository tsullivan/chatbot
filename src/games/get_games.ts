export function getGames() {
  return {
    adventure: require('./games/adventure'),
    batman: require('./games/batman'),
    bubble_gun: require('./games/bubble_gun'),
    escape_jail: require('./games/escape_jail'),
    guess_number: require('./games/guess_number'),
    hiking: require('./games/hiking'),
  };
}
