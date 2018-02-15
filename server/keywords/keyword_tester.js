const { getResponders } = require('./get_responders');

function keywordTester(input, session) {
  const responders = getResponders();
  for (const keyword in responders) {
    const responder = new responders[keyword].KeywordResponder(input, session);
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
