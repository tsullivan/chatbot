import { sample } from 'lodash';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';

class RememberResponder extends CKeywordResponder {
  constructor(input, chat) {
    super(input);
    this.setName('remember');
    this.getResponse = async () => {
      const history = chat.getUserHistory();
      const thingSaid = String(sample(history)).trim();
      return `Remember that time you said, "${thingSaid}"? I do.`;
    };
  }

  public testMatch(input) {
    return input.match(/^remember\b/);
  }

  public justDont() {
    return `Just don't ask me "remember that one time." I probably don't.`;
  }
}

export const KeywordResponder = RememberResponder;
