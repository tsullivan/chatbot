import { sample } from 'lodash';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';
import { getResponders } from '../get_responders';

class JustDontResponder extends CKeywordResponder {
  constructor(input) {
    super(input);
    this.setName('just_dont');
  }

  public testMatch(input) {
    return input.match(/^just_dont\b/);
  }

  public isListed() {
    return false;
  }

  public getResponse() {
    // get a random "just dont" message
    const responders = getResponders();
    const responderKey = sample(Object.keys(responders));
    const responder = new responders[responderKey].KeywordResponder();
    return responder.justDont();
  }
}

export const KeywordResponder = JustDontResponder;
