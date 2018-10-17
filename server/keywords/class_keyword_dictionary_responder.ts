import { sample } from 'lodash';
import { KeywordResponder } from './class_keyword_responder';
import { runDictionary } from './dictionary';

export class DictionaryResponder extends KeywordResponder {
  private requested: number | null;
  private dictionary: string;

  constructor(input) {
    super(input);
    this.requested = null;
  }

  public setDictionary(dictionary: string) {
    if (typeof dictionary !== 'string') {
      throw new Error('need to set a keyword string as the dictionary');
    }
    this.dictionary = dictionary;
    return this;
  }

  public isImpromptu() {
    return true;
  }

  public setParsedRequestedDictionaryItem(input, regex) {
    const matches = input.match(regex);
    if (matches !== null) {
      const requested = matches[1];
      const parsedRequested = parseInt(requested, 10);
      if (!Number.isNaN(parsedRequested)) {
        this.requested = parsedRequested;
      }
    }
  }

  public help() {
    return `Type \`${this.getName()}\`, or \`${this.getName()} <some number>\`, and see what happens...`;
  }

  public getRandom() {
    const dictionary = runDictionary(this.dictionary);
    const indices = Object.keys(dictionary);
    const index = parseInt(sample(indices), 10);
    return dictionary[index];
  }

  public getRequested(prefixFn) {
    const dictionary = runDictionary(this.dictionary);
    const indices = Object.keys(dictionary);
    const index = this.requested !== null ? this.requested - 1 : parseInt(sample(indices), 10);
    return prefixFn(index + 1) + ':\n' + dictionary[index];
  }
}
