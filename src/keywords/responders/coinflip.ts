import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { roll } from '../../lib';

class CoinFlipResponder extends CKeywordResponder {
  public constructor(input: string) {
    super(input);
    this.setName('coinflip');
  }

  public testMatch(input: string) {
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
