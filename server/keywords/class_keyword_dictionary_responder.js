const { sample } = require('lodash');
const { KeywordResponder } = require('./class_keyword_responder');
const { runDictionary } = require('./dictionary');

class DictionaryResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.requested = null;
  }

  setName(name) {
    this.name = name;
    return this;
  }
  setDictionary(dictionary) {
    if (typeof dictionary !== 'string') {
      throw new Error('need to set a keyword string as the dictionary');
    }
    this.dictionary = dictionary;
    return this;
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

  getRandom() {
    const dictionary = runDictionary(this.dictionary);
    const indices = Object.keys(dictionary);
    const index = parseInt(sample(indices), 10);
    return dictionary[index];
  }

  getRequested(prefixFn) {
    const dictionary = runDictionary(this.dictionary);
    const indices = Object.keys(dictionary);
    let index;
    if (this.requested !== null) {
      index = this.requested - 1;
    } else {
      index = parseInt(sample(indices), 10);
    }
    return prefixFn(index + 1) + ':\n' + dictionary[index];
  }
}

module.exports = { DictionaryResponder };
