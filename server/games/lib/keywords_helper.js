const { MultiMap } = require('../../../lib');
const { KeywordResponse } = require('./class_keyword_response');

const getKeywordsHelper = () => ({
  keywords: new MultiMap(),

  /*
   * text {String} text used for getInstructions
   * fn {Function} function that must return KeywordResponse
   */
  addKeyword(keyword, text, fn) {
    if (typeof keyword === undefined) {
      throw new Error('Keyword was undefined');
    }

    if (Array.isArray(keyword)) {
      const [primary, ...aliases] = keyword;
      this.keywords.set(primary, { text, fn });
      for (let i = 0; i < aliases.length; i++) {
        this.keywords.addAlias(aliases[i], primary);
      }
    } else {
      this.keywords.set(keyword, { text, fn });
    }
  },

  getInstructions() {
    const instructions = [];
    const iterator = this.keywords.entries();
    let loopDone = false;

    while (!loopDone) {
      const { value, done } = iterator.next();
      loopDone = done;
      if (loopDone) {
        break;
      } else {
        const [keyword, { text }] = value;
        instructions.push(`${keyword} - ${text}`);
      }
    }

    return `Type:\n${instructions.join('\n')}`;
  },

  removeKeyword(keyword) {
    if (typeof keyword === undefined) {
      throw new Error('Keyword was undefined');
    }
    this.keywords.delete(keyword);
  },

  clearKeywords() {
    this.keywords.clear();
  },

  hasKeyword(input) {
    return this.keywords.has(input);
  },

  getInputResponse(input, game) {
    const { fn } = this.keywords.get(input);
    const response = KeywordResponse.getResponseFromHandler(fn, game);

    return response.get();
  },
});

module.exports = { getKeywordsHelper };
