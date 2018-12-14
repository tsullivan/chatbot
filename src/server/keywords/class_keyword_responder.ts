export class KeywordResponder {
  private input: string;
  private name: string | null;
  private format: string;

  constructor(input) {
    this.name = null;
    this.input = input;
    this.format = 'markdown';
  }

  public setName(name) {
    this.name = name;
    return this;
  }
  public getName() {
    return this.name;
  }

  public setFormat(format) {
    this.format = format;
    return this;
  }

  public getFormat() {
    return this.format;
  }

  public isImpromptu() {
    return false;
  }

  public isListed() {
    return true;
  }

  public testMatch(input) {
    return input.match(/^$/);
  }

  public inputMatches() {
    return this.testMatch(this.input) !== null;
  }

  public help() {
    return `Type \`${this.name}\` and see what happens...`;
  }

  public justDont() {
    return `Just don't.`;
  }

  public getResponse() {
    return 'Nothing to say.';
  }

  public getRandom() {
    return this.getResponse();
  }

  public runKeyword() {
    const needsHelpMatches = this.input.match(/ help\b$/);
    if (needsHelpMatches !== null) {
      return this.help();
    }

    return this.getResponse();
  }
}
