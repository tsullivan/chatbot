import { sample } from 'lodash';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';
import { getResponders } from '../get_responders';

class RandomResponder extends CKeywordResponder {
  private getRandomResponder: () => CKeywordResponder;

  constructor(input, chat) {
    super(input);
    this.setName('random');

    this.getRandomResponder = () => {
      const responders = getResponders();
      const names = Object.keys(responders);
      const name = sample(names);
      const responder = new responders[name].KeywordResponder(null, chat);
      if (responder.isImpromptu()) {
        return responder;
      }
      return this.getRandomResponder(); // try again
    };
  }

  public testMatch(input) {
    return input.match(/^random\b/);
  }

  public justDont() {
    return `Just don't say "random". I'm not sure what will happen!`;
  }

  public getResponse() {
    const responder = this.getRandomResponder();
    return responder.getRandom();
  }
}

export const KeywordResponder = RandomResponder;