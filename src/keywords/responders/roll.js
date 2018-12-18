const { KeywordResponder } = require('../class_keyword_responder');
const { roll } = require('../../lib');

const DEFAULT_SIDES = 20;

class RollResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'roll';
    this.sides = DEFAULT_SIDES;
  }

  testMatch(input) {
    const matches = input.match(/^roll ([1-9]+[0-9]?)/);
    if (matches !== null) {
      const [_match, sides] = matches;
      this.sides = parseInt(sides, 10);
    }

    return input.match(/^roll\b/);
  }

  justDont() {
    return `Just don't say "roll 7". I don't have a d7!`;
  }

  getResponse() {
    const sides = this.sides;
    const result = roll(sides).result;

    let commentary = '';
    if (result === 20) {
      commentary = 'CRITICAL HIT!';
    } else if (result === sides) {
      commentary = 'Nice!';
    }

    const resultMessage = `It's a ${result}. ${commentary}`;
    return `Rolling a d${sides}... ${resultMessage.trim()}`;
  }
}

module.exports = { KeywordResponder: RollResponder };