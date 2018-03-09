const { ChatGame } = require('../chat_game');

const WIN_CODE = '77';
const LOSE_CODE = 'kl';

const notDone = response => ({ response, isDone: false });
const yesDone = response => ({ response, isDone: true });

/*
 * Let user guess a number between 1 and GUESS_BOUND
 */
class GuessNumber extends ChatGame {
  constructor(session) {
    super(session);
    this.name = 'batman';
  }

  init() {
    this.score = 0;
    this.batStuff = [];
  }

  testInput(input) {
    if ([WIN_CODE, LOSE_CODE].includes(input)) {
      this.saveScore(this.score);

      let response;
      if (input === WIN_CODE) {
        response = 'You win right now';
      } else if (input === LOSE_CODE) {
        this.score = 0;
        response = 'kl';
      }

      return yesDone(
        `${response}! "${input}" ended the Batgame. Your Batstuff is: ${this.batStuff.join(
          ', '
        )}. Your Batscore is ${
          this.score
        }. Average of all your Batscores is ${this.getAverageScore()}.`
      );
    } else {
      this.score += 1;
      this.batStuff.push(input);

      return notDone(`Adding ${input} to the Batcave.`);
    }
  }

  getWelcome() {
    return `Let's play Batman. Type in stuff for the Batcave, but don't type "77" or "kl".`;
  }
}

module.exports = { Game: GuessNumber };
