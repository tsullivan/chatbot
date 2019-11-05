import { KeywordResponder as CKeywordResponder } from '../keyword_responder';
import { Session } from '../../bot';
import { getResponders } from '../';
import { sample } from 'lodash';

export default class RandomResponder extends CKeywordResponder {
  private getRandomResponder: () => Promise<CKeywordResponder>;

  public constructor(input: string, { chat }: { chat: Session }) {
    super(input);
    this.setName('random');

    this.getRandomResponder = async () => {
      const responders = await getResponders();
      const names = Object.keys(responders);
      const name = sample(names);
      const responder = new responders[name](null, { chat });
      if (responder.isImpromptu()) {
        return responder;
      }
      return this.getRandomResponder(); // try again
    };
  }

  public testMatch(input: string) {
    return input.match(/^random/);
  }

  public async getResponse() {
    const responder = await this.getRandomResponder();
    return responder.getRandom();
  }
}
