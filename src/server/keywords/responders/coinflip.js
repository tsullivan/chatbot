const { KeywordResponder } = require('../class_keyword_responder');
const { roll } = require('../../../lib');

class CoinFlipResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'coinflip';
  }

  testMatch(input) {
    return input.match(/^coinflip\b/);
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
