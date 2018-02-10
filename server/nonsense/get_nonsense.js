const { roll } = require('../roll');
const { getPhraseParts } = require('./get_phrase_parts');
const { getPhrases } = require('./get_phrases');
const { MAX_REUSE } = require('../constants');

// keep these around for awhile
let parts;
let phrases;
let numUses = 0;

const createNonsense = () => {
  const pIdx = Math.floor(Math.random() * numUses);
  const phrase = phrases[pIdx];
  phrases = phrases.filter((p, currIdx) => {
    return currIdx !== pIdx;
  });
  numUses -= 1;

  return phrase;
};

function getNonsense(originalText) {
  if (numUses <= 0) {
    parts = getPhraseParts();
    phrases = getPhrases(parts);
    numUses = Math.min(MAX_REUSE, phrases.length);
  }

  const codeWord = `${parts.adjective} ${parts.noun}`;
  if (originalText.toLowerCase() === codeWord.toLowerCase()) {
    return `That's what I'm talking about! ${codeWord}!`;
  }

  if (roll(10).atLeast(3)) {
    return {
      useNonsense: true,
      nonsense: createNonsense()
    };
  }

  numUses = 0;
  return {
    useNonsense: false
  };
}

module.exports = {
  getNonsense
};
