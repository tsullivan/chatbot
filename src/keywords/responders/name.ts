import * as apm from 'elastic-apm-node';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';

class NameResponder extends CKeywordResponder {
  constructor(input, chat) {
    super(input);
    this.setName('name');

    this.getResponse = async () => {
      let name;

      try {
        chat.setWaitOnName();
        name = chat.getName();
      } catch (err) {
        apm.captureError(err);
        return 'An error has been logged.';
      }

      if (name === null) {
        return 'I have no idea what your name is! What is it?';
      }
      return `I think your name is ${name}. What is it really?`;
    };
  }

  public testMatch(input) {
    return input.match(/^name\b/);
  }
}

export const KeywordResponder = NameResponder;
