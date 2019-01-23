import { sample } from 'lodash';
import { getResponders } from '../';
import { KeywordResponder as CKeywordResponder} from '../keyword_responder';

class RandomResponder extends CKeywordResponder {
  private getRandomResponder: () => Promise<CKeywordResponder>;

  constructor(input, chat) {
    super(input);
    this.setName('random');

    this.getRandomResponder = async () => {
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

  public async getResponse() {
    const responder = await this.getRandomResponder();
    return responder.getRandom();
  }
}

export const KeywordResponder = RandomResponder;
