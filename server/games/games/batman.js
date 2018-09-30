const snl = require('strip-newlines');
const { ChatGame } = require('../chat_game');

const WIN_CODE = '77';
const LOSE_CODE = 'kl';

const notDone = response => ({ response, format: 'markdown', isDone: false });
const yesDone = response => ({ response, format: 'markdown', isDone: true });

/*
 * Let user guess a number between 1 and GUESS_BOUND
 */
class Batman extends ChatGame {
  constructor(session) {
    super(session);
    this.setName('batman');
  }

  init() {
    this.score = 0;
    this.batStuff = [];
  }

  testInput(input) {
    if ([WIN_CODE, LOSE_CODE].includes(input)) {
      let response;
      if (input === WIN_CODE) {
        response = 'You won! Right now!!';
      } else if (input === LOSE_CODE) {
        this.score = 0;
        response = 'Type "kl" and you lose the Batgame :(';
      }

      const items = this.batStuff.reduce((accum, curr) => `${accum}\n- ${curr}`, '');
      return yesDone(
        `${response} "${input}" ended the Batgame. Your Batstuff is:\n${items}\n\nYour Batscore is ${
          this.score
        }.`
      );
    } else {
      this.score += 1;
      this.batStuff.push(input);

      return notDone(`Adding ${input} to the Batcave.`);
    }
  }

  getWelcome() {
    return snl`Let's play Batman. Type in stuff for the Batcave. Type "77" to
      keep your points or "kl" to throw it all away.`;
  }
}

module.exports = { Game: Batman };
