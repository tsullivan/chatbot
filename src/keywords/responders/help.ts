import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { getResponders } from '../';

class HelpResponder extends CKeywordResponder {
  public constructor(input: string) {
    super(input);
    this.setName('help');
    this.setResponseFormat('markdown');
  }

  public testMatch(input: string) {
    return input.match(/^help\b/);
  }

  public async getResponse(): Promise<string> {
    const responders = getResponders();
    const responderKeys = Object.keys(responders);
    const usableResponders = responderKeys.filter(key => {
      const responder = new responders[key].KeywordResponder();
      return responder.isListed() === true;
    });

    // check if ask for help about keyword
    const keywordMatches = this.input.match(/^help (\S+)$/);
    if (keywordMatches !== null) {
      const keyword = keywordMatches[1];

      if (responders[keyword] !== undefined) {
        const responder = new responders[keyword].KeywordResponder();
        return responder.help();
      }
    }

    const items = usableResponders.reduce((accum, curr) => `${accum}\n- ${curr}`, '');
    return 'Here are keywords you can use:\n' + items;
  }
}

export const KeywordResponder = HelpResponder;
