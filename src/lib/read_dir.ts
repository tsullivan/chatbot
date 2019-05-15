import { promisify } from 'util';
import { readdir } from 'fs';
import { resolve } from 'path';

interface YoLoSet {
  [key: string]: any;
}

export async function readDir(path: string) {
  const readDirAsync = promisify(readdir);

  return readDirAsync(path, 'UTF-8').then(
    (listing: string[]) => {
      const cache = listing.reduce((accum: YoLoSet, item: string) => {
        const cleanItem = item.replace(/(\w+)\.ts/, '$1');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { default: def } = require(resolve(path, item));
        return {
          ...accum,
          [cleanItem]: def,
        };
      }, {});

      this.cache = cache;
      return cache;
    }
  );
}

