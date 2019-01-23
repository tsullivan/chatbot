import { KeywordResponder as CKeywordResponder } from '../keyword_responder';

class ScoreResponder extends CKeywordResponder {
  constructor(input, chat) {
    super(input);
    this.setName('score');

    this.getResponse = async () => {
      return `The average score of the games you plaid are : ${chat.getAverageScore()}`;
    };
  }

  public testMatch(input) {
    return input.match(/^score\b/);
  }
}

export const KeywordResponder = ScoreResponder;
