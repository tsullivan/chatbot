import { KeywordResponder as CKeywordResponder } from './keyword_responder';
import { Session } from '../bot';
import { sample } from 'lodash';

export default class RememberResponder extends CKeywordResponder {
  public constructor(input: string, { chat }: { chat: Session }) {
    super(input);
    this.setName('remember');
    this.getResponse = async () => {
      const history = chat.getUserHistory();
      const thingSaid = String(sample(history)).trim();
      return `Remember that time you said, "${thingSaid}"?`;
    };
  }

  public testMatch(input: string) {
    return input.match(/^remember/);
  }
}
