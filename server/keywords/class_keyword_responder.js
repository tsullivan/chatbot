class KeywordResponder {
  constructor(input) {
    this.input = input;
    this.name = null;
    this.format = 'plain';
  }

  getName() {
    return this.name;
  }

  setFormat(format) {
    this.format = format;
    return this;
  }

  getFormat() {
    return this.format;
  }

  isImpromptu() {
    return false;
  }

  isListed() {
    return true;
  }

  testMatch(input) {
    return input.match(/^$/);
  }

  inputMatches() {
    return this.testMatch(this.input) !== null;
  }

  help() {
    return `Type \`${this.name}\` and see what happens...`;
  }

  justDont() {
    return `Just don't.`;
  }

  getResponse() {
    return 'Nothing to say.';
  }

  getRandom() {
    return this.getResponse();
  }

  runKeyword() {
    const needsHelpMatches = this.input.match(/ help\b$/);
    if (needsHelpMatches !== null) {
      return this.help();
    }

    return this.getResponse();
  }
}

module.exports = { KeywordResponder };
