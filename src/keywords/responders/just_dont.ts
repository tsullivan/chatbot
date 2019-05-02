import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { getResponders } from '../';
import { sample } from 'lodash';

class JustDontResponder extends CKeywordResponder {
  public constructor(input: string) {
    super(input);
    this.setName('just_dont');
  }

  public testMatch(input: string) {
    return input.match(/^just_dont\b/);
  }

  public isListed() {
    return false;
  }

  public async getResponse(): Promise<string> {
    // get a random "just dont" message
    const responders = getResponders();
    const responderKey = sample(Object.keys(responders));
    const responder = new responders[responderKey].KeywordResponder();
    return responder.justDont();
  }
}

export const KeywordResponder = JustDontResponder;
