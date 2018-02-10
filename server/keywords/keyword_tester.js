const { getResponders } = require('./get_responders');

function keywordTester(input) {
  const responders = getResponders();
  for (const keyword in responders) {
    const responder = new responders[keyword].Responder(input);
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
