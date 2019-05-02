import { KeywordResponder as CKeywordResponder} from '../keyword_responder';

class SayResponder extends CKeywordResponder {
  private thingToSay: string;

  public constructor(input: string) {
    super(input);
    this.setName('say');
    this.thingToSay = null;
  }

  public testMatch(input: string) {
    const matches = input.match(/^say (.*)$/);
    if (matches !== null) {
      const thingToSay = matches[1];
      if (thingToSay.trim() !== '') {
        this.thingToSay = thingToSay;
      }
    }

    return input.match(/^say\b(.*)$/);
  }

  public help() {
    return `\`say\`: Type \`say something\` and see what happens.`;
  }

  public justDont() {
    return `Just don't tell me to say something.`;
  }

  public async getResponse(): Promise<string> {
    if (this.thingToSay === null) {
      return this.help();
    }

    return this.thingToSay;
  }
}

export const KeywordResponder = SayResponder;
