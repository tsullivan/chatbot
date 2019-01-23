import { getResponders } from '../';
import { KeywordResponder as CKeywordResponder} from '../keyword_responder';

class HelpResponder extends CKeywordResponder {
  constructor(input) {
    super(input);
    this.setName('help');
    this.setFormat('markdown');
  }

  public testMatch(input) {
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
