const { getCodename } = require('./get_codename');
const { getPhrases } = require('./get_phrases');

// keep these around for awhile
let name;
let phrases;
let numUses = 0;

function createNonsense(originalText) {
  if (numUses === 0) {
    name = getCodename();
    phrases = getPhrases(name);
    numUses = phrases.length;
  }

  if (originalText.toLowerCase() === name.toLowerCase()) {
    return (
      `That's what I'm talking about! ${name}!`
    );
  }

  const pIdx = Math.floor(Math.random() * numUses);
  const phrase = phrases[pIdx];
  phrases = phrases.filter((p, currIdx) => {
    return currIdx !== pIdx;
  });
  numUses -= 1;

  return phrase;
}

module.exports = {
  createNonsense
};
