const { ChatGame } = require('../chat_game');

/*
 * Let user guess a number between 1 and 20
 */
class GuessNumber extends ChatGame {
  constructor() {
    super();
    this.name = 'guess_number';
  }

  init() {
    this.score = 20;

    //  Generate the number and stage a reply about it
    const { random, floor } = Math;
    this.target = floor(random() * 20) + 1;
  }

  testInput(input) {
    const guess = parseInt(input, 10);

    if (guess !== this.target) {
      const isDone = false;
      this.score -= 1;
      if (guess < this.target) {
        return { response: 'Too low', isDone };
      } else {
        return { response: 'Too high', isDone };
      }
    }

    return {
      isDone: true,
      response: `You got it! ${input} is the right number. You guessed ${this.guesses} times.`
    };
  }

  getWelcome() {
    return `Let's play guess a number. I'm thinking of a number between 1 and 20. Try to guess it.`;
  }
}

module.exports = { Game: GuessNumber };
