import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { Session } from '../../bot';
import { sample } from 'lodash';

class RememberResponder extends CKeywordResponder {
  public constructor(input: string, chat: Session) {
    super(input);
    this.setName('remember');
    this.getResponse = async () => {
      const history = chat.getUserHistory();
      const thingSaid = String(sample(history)).trim();
      return `Remember that time you said, "${thingSaid}"? I do.`;
    };
  }

  public testMatch(input: string) {
    return input.match(/^remember\b/);
  }

  public justDont() {
    return `Just don't ask me "remember that one time." I probably don't.`;
  }
}

export const KeywordResponder = RememberResponder;
