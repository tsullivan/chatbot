import { ResponderSet } from './keyword_responder';
import { promisify } from 'util';
import { readdir } from 'fs';
import { resolve } from 'path';

export { keywordTester } from './keyword_tester';

export async function getResponders(): Promise<ResponderSet> {
  if (this.cache) {
    return this.cache;
  }

  const readDirAsync = promisify(readdir);
  return readDirAsync(resolve(__dirname, './responders/'), 'UTF-8').then(
    (listing: string[]) => {
      const cache = listing.reduce((accum: ResponderSet, item: string) => {
        const cleanItem = item.replace(/(\w+)\.ts/, '$1');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { default: ResponderClass } = require(resolve(__dirname, './responders/', item));
        return {
          ...accum,
          [cleanItem]: ResponderClass,
        };
      }, {});

      this.cache = cache;
      return cache;
    }
  );
}

getResponders.cache = null;
