class KeywordResponder {

  constructor(input) {
    this.input = input;
    this.name = null;
  }

  isImpromptu() {
    return false;
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

  getResponse() {
    return 'Nothing to say.';
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
