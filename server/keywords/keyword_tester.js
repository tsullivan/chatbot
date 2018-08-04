const { getResponders } = require('./get_responders');

function keywordTester(input, chat) {
  const responders = getResponders();
  for (const keyword in responders) {
    if (responders[keyword] == null || responders[keyword] == null) {
      throw new Error('Bad keyword responder: ' + keyword);
    }

    try {
      const responder = new responders[keyword].KeywordResponder(input, chat);
      if (responder.inputMatches()) {
        return {
          isKeyword: true,
          responder,
        };
      }
    } catch (err) {
      throw new Error('Bad keyword responder constructor: ' + keyword);
    }
  }
  return { isKeyword: false };
}

module.exports = { keywordTester };
