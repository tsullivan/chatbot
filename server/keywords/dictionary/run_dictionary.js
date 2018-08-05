const { capitalize, cloneDeep, sample } = require('lodash');
const { roll } = require('../../roll');
const getData = () => cloneDeep(require('./dictionary'));

function reduce(cb, accum) {
  const data = getData();
  for (let kI = 0; kI < Object.keys(data).length; kI++) {
    const kSet = Object.keys(data)[kI];

    for (let sI = 0; sI < data[kSet].length; sI++) {
      const s = data[kSet][sI];
      const matches = s.match(/\${\S+:[^}]+}/g);
      if (matches) {
        for (let mI = 0; mI < matches.length; mI++) {
          const m = matches[mI];
          const [_match, kind, thing] = m.match(/\${(\S+):([^}]+)}/);
          accum = cb(accum, kSet, kind, thing, sI);
        }
      }
    }
  }
  return accum;
}

const _vocabulary = reduce((accum, _kSet, kind, thing) => {
  if (accum[kind]) {
    accum[kind].push(thing);
  } else {
    accum[kind] = [];
    accum[kind].push(thing);
  }
  return accum;
}, {});

function runDictionary(kSet = '') {
  const data = getData();
  const dictionary = reduce((accum, myKSet, kind, thing, i) => {
    if (data[myKSet][i] == null) {
      throw new Error(`Need a string: ${[myKSet, i]}, ${Object.keys(data[myKSet])}`);
    }

    const currValue = data[myKSet][i];
    let newValue;
    if (roll(2).result === 1) {
      let replacer = sample(_vocabulary[kind]);
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

module.exports = { runDictionary };
