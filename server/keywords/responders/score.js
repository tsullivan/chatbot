const { KeywordResponder } = require('../keyword_responder');

class ScoreResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.name = 'score';

    this.getResponse = () => {
      return `The average score of the games you plaid are : ${chat.getAverageScore()}`;
    };
  }

  testMatch(input) {
    return input.match(/^score\b/);
  }
}

module.exports = { KeywordResponder: ScoreResponder };
