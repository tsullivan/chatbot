import { KeywordResponder as CKeywordResponder } from '../keyword_responder';
import { Session } from '../../bot';

class ScoreResponder extends CKeywordResponder {
  public constructor(input: string, chat: Session) {
    super(input);
    this.setName('score');

    this.getResponse = async () => {
      return `The average score of the games you plaid are : ${chat.getAverageScore()}`;
    };
  }

  public testMatch(input: string) {
    return input.match(/^score\b/);
  }
}

export const KeywordResponder = ScoreResponder;
