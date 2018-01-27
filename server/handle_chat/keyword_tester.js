const { getPlugins } = require('../keywords');

function keywordTester(input) {
  const plugins = getPlugins();
  for (const keyword in plugins) {
    const responder = new plugins[keyword].Responder(input);
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
