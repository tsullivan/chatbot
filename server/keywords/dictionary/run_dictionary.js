const { sample } = require('lodash');
const data = require('./dictionary');

// match the regexes against the data and signal the parsed info via callback
function findVocabulary(rawData, cb) {
  Object.keys(rawData).forEach(kSet => {
    data[kSet].forEach((s, i) => {
      const matches = s.match(/\${\S+:[^}]+}/g);
      if (matches) {
        matches.forEach(m => {
          const [_match, kind, thing] = m.match(/\${(\S+):([^}]+)}/);
          cb(kSet, kind, thing, i);
        });
      }
    }, []);
  });
}

function runDictionary() {
  const found = {};
  findVocabulary(data, (kSet, kind, thing) => {
    if (found[kind]) {
      found[kind].push(thing);
    } else {
      found[kind] = [];
      found[kind].push(thing);
    }
  });

  const newDictionary = Object.assign({}, data);
  findVocabulary(data, (kSet, kind, thing, i) => {
    const currValue = newDictionary[kSet][i];
    newDictionary[kSet][i] = currValue.replace(
      `\${${kind}:${thing}}`,
      sample(found[kind])
    );
  });
  return newDictionary;
}

module.exports = { runDictionary };
