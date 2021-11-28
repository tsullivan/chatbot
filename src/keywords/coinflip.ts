import {roll} from '../lib';
import {KeywordResponder as CKeywordResponder} from './keyword_responder';

export default class CoinFlipResponder extends CKeywordResponder {
  public constructor(input: string) {
    super(input);
    this.setName('coinflip');
  }

  public testMatch(input: string) {
    return input.match(/^coinflip/);
  }

  public async getResponse(): Promise<string> {
    const result = roll(2).result === 1 ? 'HEADS' : 'TAILS';
    return `Flipping a coin... ${result}!`;
  }
}
