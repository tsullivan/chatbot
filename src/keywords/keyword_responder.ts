import { GameSet, ResponseFormat } from '../types';
import { Session } from '../bot';

export interface ResponderOptions {
  chat?: Session;
  gameSet?: GameSet;
  format?: ResponseFormat;
}

export type ResponderClass = new (
  input: string,
  options: ResponderOptions
) => KeywordResponder;

export interface ResponderSet {
  [responderKey: string]: ResponderClass;
}

export class KeywordResponder {
  protected input: string;
  private name: string | null;
  private format: ResponseFormat;

  public constructor(input: string | null, { format }: { format?: ResponseFormat } = {}) {
    this.name = null;
    this.input = input;
    this.format = format || 'markdown';
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }
  public getName() {
    return this.name;
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

  public testMatch(input: string) {
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

  public async getResponse(): Promise<string> {
    return 'Nothing to say.';
  }

  public async getRandom() {
    return this.getResponse();
  }

  public async runKeyword(): Promise<string> {
    const needsHelpMatches = this.input.match(/ help\b$/);
    if (needsHelpMatches !== null) {
      return this.help();
    }

    return this.getResponse();
  }
}
