const { sample } = require('lodash');
const { KeywordResponder } = require('./class_keyword_responder');

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
    return `Type \`${this.name}\`, or \`${this.name} <some number>\`, and see what happens...`; // prettier-ignore
  }

  getRandomOrRequested({ prefix, dictionary }) {
    const indices = Object.keys(dictionary);
    let index;
    if (this.requested !== null) {
      index = this.requested - 1;
    } else {
      index = parseInt(sample(indices), 10);
    }
    return prefix(index + 1) + ':\n' + dictionary[index];
  }
}

module.exports = { DictionaryResponder };
