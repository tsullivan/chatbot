import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { getResponders } from '../';

export default class HelpResponder extends CKeywordResponder {
  public constructor(input: string) {
    super(input);
    this.setName('help');
  }

  public testMatch(input: string) {
    return input.match(/^help/);
  }

  public async getResponse(): Promise<string> {
    const responders = await getResponders();
    const responderKeys = Object.keys(responders);
    const usableResponders = responderKeys.filter(key => {
      const responder = new responders[key](null, {});
      return responder.isListed() === true;
    });

    // check if ask for help about keyword
    const keywordMatches = this.input.match(/^help (\S+)$/);
    if (keywordMatches !== null) {
      const keyword = keywordMatches[1];

      if (responders[keyword] !== undefined) {
        const responder = new responders[keyword](null, {});
        return responder.help();
      }
    }

    const items = usableResponders.map((text) => `\n- \`${text}\``);
    return `Here are keywords you can use:\n${items.join('')}`;
  }
}
