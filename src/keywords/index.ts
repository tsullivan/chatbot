import { ResponderSet } from './keyword_responder';
import { readDir } from '../lib';
import { resolve } from 'path';

export { keywordTester } from './keyword_tester';

export async function getResponders(): Promise<ResponderSet> {
  if (this.cache) {
    return this.cache;
  }

  return readDir(resolve(__dirname, './responders/'));
}

getResponders.cache = null;
