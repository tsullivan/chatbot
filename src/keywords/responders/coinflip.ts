import { roll } from '../../lib';
import { KeywordResponder as CKeywordResponder} from '../class_keyword_responder';

class CoinFlipResponder extends CKeywordResponder {
  constructor(input) {
    super(input);
    this.setName('coinflip');
  }

  public testMatch(input) {
    return input.match(/^coinflip\b/);
  }

  public justDont() {
    return `Just don't say "coinflip", I'll flip out!`;
  }

  public async getResponse(): Promise<string> {
    const result = roll(2).result === 1 ? 'HEADS' : 'TAILS';
    return `Flipping a coin... ${result}!`;
  }
}

export const KeywordResponder = CoinFlipResponder;
