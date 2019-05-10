import { KeywordResponder as CKeywordResponder} from '../keyword_responder';
import { roll } from '../../lib';

const DEFAULT_SIDES = 20;

export default class RollResponder extends CKeywordResponder {
  private sides: number;

  public constructor(input: string) {
    super(input);
    this.setName('roll');
    this.sides = DEFAULT_SIDES;
  }

  public testMatch(input: string) {
    const matches = input.match(/^roll ([1-9]+[0-9]?)/);
    if (matches !== null) {
      const [ sides] = matches.splice(1, 1);
      this.sides = parseInt(sides, 10);
    }

    return input.match(/^roll\b/);
  }

  public justDont() {
    return `Just don't say "roll 7". I don't have a d7!`;
  }

  public async getResponse(): Promise<string> {
    const sides = this.sides;
    const result = roll(sides).result;

    let commentary = '';
    if (result === 20) {
      commentary = 'CRITICAL HIT!';
    } else if (result === sides) {
      commentary = 'Nice!';
    }

    const resultMessage = `It's a ${result}. ${commentary}`;
    return `Rolling a d${sides}... ${resultMessage.trim()}`;
  }
}
