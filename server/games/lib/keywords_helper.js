const { MultiMap } = require('../../../lib');
const { KeywordResponse } = require('./class_keyword_response');

const getKeywordsHelper = () => ({
  _keywords: new MultiMap(),

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
      this._keywords.set(primary, { text, fn });
      for (let i = 0; i < aliases.length; i++) {
        this._keywords.addAlias(aliases[i], primary);
      }
    } else {
      this._keywords.set(keyword, { text, fn });
    }
  },

  getInstructions(prefix = '') {
    const instructions = [];
    const iterator = this._keywords.entries();
    let loopDone = false;

    while (!loopDone) {
      const { value, done } = iterator.next();
      loopDone = done;
      if (loopDone) {
        break;
      } else {
        const [keyword, { text }] = value;
        instructions.push(`${prefix}${keyword} - ${text}`);
      }
    }

    return instructions.join('\n');
  },

  removeKeyword(keyword) {
    if (typeof keyword === undefined) {
      throw new Error('Keyword was undefined');
    }
    this._keywords.delete(keyword);
  },

  clearKeywords() {
    this._keywords.clear();
  },

  hasKeywords() {
    return this._keywords.size > 0;
  },

  hasKeyword(input) {
    return this._keywords.has(input);
  },

  getInputResponse(input, game) {
    const resp = this._keywords.get(input);
    if (!resp) {
      throw new Error(`keyword ${input} is broken: ` + JSON.stringify(this));
    }
    const { fn } = resp;
    const response = KeywordResponse.getResponseFromHandler(fn, game);

    this.clearKeywords();
    game.updateState();

    return response.get();
  },
});

module.exports = { getKeywordsHelper };