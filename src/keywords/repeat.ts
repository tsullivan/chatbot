import { KeywordResponder as CKeywordResponder} from './keyword_responder';

export default class RepeatResponder extends CKeywordResponder {
  private num: number;
  private phrase: string;

  public constructor(input: string) {
    super(input);
    this.setName('repeat');
    this.phrase = null;
  }

  public testMatch(input: string) {
    const matches = input.match(/^repeat\s*([0-9]+)\s*([\S ]+)$/);
    if (matches !== null) {
      const num = parseInt(matches[1], 10);
      const phrase = matches[2];
      if (num > 0 && num <= 1000) {
        this.num = num;
        this.phrase = phrase;
      }
    }

    return input.match(/^repeat/);
  }

  public help() {
    return `\`repeat\`: Repeats a phrase between 1-1000 times.
      Usage: \`repeat <NUM> <PHRASE>\``;
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
