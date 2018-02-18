const { sample } = require('lodash');
const { oneOf } = require('../one_of');
const { roll } = require('../roll');
const { getPhraseParts } = require('./get_phrase_parts');
const { getPhrases } = require('./get_phrases');
const { MAX_REUSE } = require('../constants');

// keep these around across multiple requests
let parts;
let phrases;
let numUses = 0;

const createSeededNonsense = generators => {
  const myNoun = oneOf(generators);
  const { adjective } = getPhraseParts();
  const myPhrases = getPhrases({ adjective, noun: myNoun });
  return sample(myPhrases);
};

const createNonsense = () => {
  const pIdx = Math.floor(Math.random() * numUses);
  const phrase = phrases[pIdx];
  phrases = phrases.filter((p, currIdx) => {
    return currIdx !== pIdx;
  });
  numUses -= 1;

  return phrase;
};

function getNonsense(userMessage, seedNounGenerators) {
  if (numUses <= 0) {
    parts = getPhraseParts();
    phrases = getPhrases(parts);
    numUses = Math.min(MAX_REUSE, phrases.length);
  }

  const codeWord = `${parts.adjective} ${parts.noun}`;
  if (userMessage.toLowerCase() === codeWord.toLowerCase()) {
    return `That's what I'm talking about! ${codeWord}!`;
  }

  if (roll(7).atLeast(6)) {
    return createSeededNonsense(seedNounGenerators);
  }

  if (roll(5).is(5)) {
    numUses = 0;
  }

  return createNonsense();
}

module.exports = {
  getNonsense
};
