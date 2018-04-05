const { KeywordResponder } = require('../keyword_responder');
const { roll } = require('../../roll');

class CoinFlipResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'coinflip';
  }

  testMatch(input) {
    return input.match(/^coinflip\b/);
  }

  isImpromptu() {
    return true;
  }

  justDont() {
    return `Just don't say "coinflip", I'll flip out!`;
  }

  getResponse() {
    const result = roll(2).result === 1 ? 'HEADS' : 'TAILS';
    return `Flipping a coin... ${result}!`;
  }
}

module.exports = { KeywordResponder: CoinFlipResponder };
