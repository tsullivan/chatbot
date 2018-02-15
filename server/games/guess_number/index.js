const { ChatGame } = require('../chat_game');

/*
 * Let user guess a number between 1 and 20
 */
class GuessNumber extends ChatGame {
  constructor(session) {
    super(session);
    this.name = 'guess_number';
  }

  init() {
    this.score = 20;
    this.guesses = 0;

    //  Generate the number and stage a reply about it
    const { random, floor } = Math;
    this.target = floor(random() * 20) + 1;
  }

  testInput(input) {
    this.guesses += 1;
    const isDone = false;
    const guess = parseInt(input, 10);

    if (guess < 1 || guess > 20) {
      this.score -= 2;
      return {
        response: 'The number is between 1 and 20. That guess is outside of the bounds!',
        isDone
      };
    }

    if (guess !== this.target) {
      this.score -= 1;

      if (guess < this.target) {
        return { response: 'Too low', isDone };
      } else {
        return { response: 'Too high', isDone };
      }
    }

    return {
      isDone: true,
      response: (
        `You got it! ${input} is the right number. You guessed ` +
        `${this.guesses} times. Your score is ${this.score}.`
      )
    };
  }

  getWelcome() {
    return `Let's play guess a number. I'm thinking of a number between 1 and 20. Try to guess it.`;
  }
}

module.exports = { Game: GuessNumber };
