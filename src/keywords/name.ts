import { KeywordResponder as CKeywordResponder} from './keyword_responder';
import { Session } from '../bot';

export default class NameResponder extends CKeywordResponder {
  public constructor(input: string, { chat }: { chat?: Session } = {}) {
    super(input);
    this.setName('name');

    this.getResponse = async () => {
      let name;

      try {
        chat.setWaitOnName();
        name = chat.getName();
      } catch (err) {
        // errors$.next(err); // FIXME
        return 'An error has been logged.';
      }

      if (name === null) {
        return 'I have no idea what your name is! What is it?';
      }
      return `I think your name is ${name}. What is it really?`;
    };
  }

  public testMatch(input: string) {
    return input.match(/^name/);
  }
}
