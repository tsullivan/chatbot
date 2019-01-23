import { KeywordResponder as CKeywordResponder} from '../keyword_responder';

class RepeatResponder extends CKeywordResponder {
  private num: number;
  private phrase: string;

  constructor(input) {
    super(input);
    this.setName('repeat');
    this.phrase = null;
  }

  public testMatch(input) {
    const matches = input.match(/^repeat ([0-9]+) ([\S ]+)$/);
    if (matches !== null) {
      const num = matches[1];
      const phrase = matches[2];
      if (num > 0 && num <= 1000) {
        this.num = num;
        this.phrase = phrase;
      }
    }

    return input.match(/^repeat\b/);
  }

  public help() {
    return `\`repeat\`: Repeats a phrase between 1-1000 times.
      Usage: \`repeat <NUM> <PHRASE>\``;
  }

  public justDont() {
    return `Just don't say "repeat 50 blah"`;
  }

  public async getResponse(): Promise<string> {
    if (this.phrase === null) {
      return this.help();
    }

    let message = '';
    for (let n = 0; n < this.num; n += 1) {
      message += this.phrase + ' ';
    }
    return message.trim();
  }
}

export const KeywordResponder = RepeatResponder;
