import { KeywordResponder as CKeywordResponder } from './keyword_responder';
import { Session } from '../bot';

export default class ScoreResponder extends CKeywordResponder {
  public constructor(input: string, { chat }: { chat: Session }) {
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
