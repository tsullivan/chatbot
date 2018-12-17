const { ChatGame } = require('../chat_game');

const GUESS_BOUND = 20;
const notDone = response => ({ response, isDone: false });

/*
 * Let user guess a number between 1 and GUESS_BOUND
 */
class GuessNumber extends ChatGame {
  constructor(session) {
    super(session);
    this.setName('guess_number');
  }

  init() {
    this.score = 20;
    this.guesses = 0;

    //  Generate the number and stage a reply about it
    const { random, floor } = Math;
    this.target = floor(random() * GUESS_BOUND) + 1;
  }

  testInput(input) {
    this.guesses += 1;
    const guess = parseInt(input, 10);

    if (Number.isNaN(guess)) {
      this.score -= 3;
      return notDone(`WRONG. "${input}" is not a number, ${this.getPlayerName()}!`);
    }

    if (guess < 1 || guess > GUESS_BOUND) {
      this.score -= 2;
      return notDone(
        `WRONG. The number is between 1 and ${GUESS_BOUND}. ${guess} isn't that, ${this.getPlayerName()}!`
      );
    }

    if (guess !== this.target) {
      this.score -= 1;

      if (guess < this.target) {
        return notDone(`Good guess, but ${guess} is too low :(`);
      } else {
        return notDone(`Good guess, but ${guess} is too high :(`);
      }
    }

    return {
      isDone: true,
      response: `You got it! ${input} is the right number. You guessed ${
        this.guesses
      } times. Your score is ${this.score}.`,
    };
  }

  getWelcome() {
    return `# Let's play guess a number.\nI'm thinking of a number between 1 and ${GUESS_BOUND}. Try to guess it.`;
  }
}

module.exports = { Game: GuessNumber };
