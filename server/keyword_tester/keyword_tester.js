const { keywords } = require('../keywords');

function keywordTester(input) {
  for (const keyword of keywords) {
    const responder = new keyword.Responder(input);
    if (responder.inputMatches()) {
      return {
        isKeyword: true,
        responder
      };
    }
  }
  return { isKeyword: false };
}

module.exports = { keywordTester };
