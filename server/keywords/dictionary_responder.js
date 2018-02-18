const { sample } = require('lodash');
const { KeywordResponder } = require('./keyword_responder');

class DictionaryResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.requested = null;
  }

  isImpromptu() {
    return true;
  }

  setParsedRequestedDictionaryItem(input, regex) {
    const matches = input.match(regex);
    if (matches !== null) {
      const [_matched, requested] = matches;
      const parsedRequested = parseInt(requested);
      if (!Number.isNaN(parsedRequested, 10)) {
        this.requested = parsedRequested;
      }
    }
  }

  help() {
    return `Type \`${this.name}\`, or \`${this.name} <some number>\`, and see what happens...`;
  }

  getRandomOrRequested({ prefix, dictionary }) {
    const indices = Object.keys(dictionary);
    let index;
    if (this.requested !== null) {
      index = this.requested - 1;
    } else {
      index = parseInt(sample(indices), 10);
    }
    return prefix(this.requested) + ':\n' + dictionary[index];
  }
}

module.exports = { DictionaryResponder };
