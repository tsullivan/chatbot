const { getResponders } = require('./get_responders');

function keywordTester(input, chat) {
  const responders = getResponders();
  for (const keyword in responders) {
    const responder = new responders[keyword].KeywordResponder(input, chat);
    if (responder.inputMatches()) {
      return {
        isKeyword: true,
        responder,
      };
    }
  }
  return { isKeyword: false };
}

module.exports = { keywordTester };
