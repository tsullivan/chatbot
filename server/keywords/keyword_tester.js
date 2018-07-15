const { getResponders } = require('./get_responders');

function keywordTester(input, chat) {
  const responders = getResponders();
  for (const keyword in responders) {
    if (responders[keyword] == null || responders[keyword] == null) {
      throw new Error('Bad keyword responder: ' + keyword);
    }
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
