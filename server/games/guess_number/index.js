/*
 * Let user guess a number between 1 and 20
 */
class GuessNumber {
  constructor(session) {
    // if session does not have number to guess
    //  - generate the number and stage a reply about it

    // if original text contains a valid guess
    //  - test the guess and stage a reply
    //  - if the guess is correct, tell them the number of guesses it took and clear the game state
    //  - if the guess is incorrect, increment the number of guesses and tell them if too low or too high

    // if original text contains an invalid value
  }

  init() {
    if (!session.games.guess_number.target) {
      const { random, floor } = Math;
      session.games.guess_number.target = floor(random() * 20) + 1;
      session.pushNextBotMessage('I thought of a number between 1 and 20. Can you guess it?');
    }
  }

  getResponse() {
  }
}

module.exports = { GuessNumber };
