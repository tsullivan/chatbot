import { capitalize, cloneDeep, sample } from 'lodash';
import { roll } from '../../lib';

const getData = () => cloneDeep(require('./dictionary'));

function reduce(cb, accum) {
  const data = getData();
  const dataKeys = Object.keys(data);
  for (const kI in dataKeys) {
    if (dataKeys.hasOwnProperty(kI)) {
      const kSet = dataKeys[kI];

      for (let sI = 0; sI < data[kSet].length; sI++) {
        const s = data[kSet][sI];
        const matches = s.match(/\${\S+:[^}]+}/g);
        if (matches) {
          for (const mI in matches) {
            if (matches.hasOwnProperty(mI)) {
              const m = matches[mI];
              const subMatches = m.match(/\${(\S+):([^}]+)}/);
              const [ kind, thing ] = subMatches.splice(1, 2);
              accum = cb(accum, kSet, kind, thing, sI);
            }
          }
        }
      }
    }
  }
  return accum;
}

const vocabulary = reduce((accum, kSet, kind, thing) => {
  if (accum[kind]) {
    accum[kind].push(thing);
  } else {
    accum[kind] = [];
    accum[kind].push(thing);
  }
  return accum;
}, {});

export function runDictionary(kSet = '') {
  const data = getData();
  const dictionary = reduce((accum, myKSet, kind, thing, i) => {
    if (data[myKSet][i] == null) {
      throw new Error(`Need a string: ${[myKSet, i]}, ${Object.keys(data[myKSet])}`);
    }

    const currValue = data[myKSet][i];
    let newValue;
    if (roll(2).result === 1) {
      let replacer = sample(vocabulary[kind]);
      if (thing.match(/^[A-Z]/)) {
        replacer = capitalize(replacer);
      }
      newValue = currValue.replace(`\${${kind}:${thing}}`, replacer);
    } else {
      newValue = currValue.replace(`\${${kind}:${thing}}`, thing);
    }

    if (accum[myKSet]) {
      accum[myKSet][i] = newValue;
    } else {
      accum[myKSet] = [newValue];
    }
    return accum;
  }, data);

  return kSet ? dictionary[kSet] : dictionary;
}
