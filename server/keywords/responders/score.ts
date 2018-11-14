import { KeywordResponder } from '../class_keyword_responder';

class ScoreResponder extends KeywordResponder {
  constructor(input, chat) {
    super(input);
    this.setName('score');

    this.getResponse = () => {
      return `The average score of the games you plaid are : ${chat.getAverageScore()}`;
    };
  }

  public testMatch(input) {
    return input.match(/^score\b/);
  }
}

module.exports = { KeywordResponder: ScoreResponder };
