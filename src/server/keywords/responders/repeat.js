const { KeywordResponder } = require('../class_keyword_responder');

class RepeatResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'repeat';
    this.phrase = null;
  }

  testMatch(input) {
    const _matches = input.match(/^repeat ([0-9]+) ([\S ]+)$/);
    if (_matches !== null) {
      const [_matched, num, phrase] = _matches;
      if (num > 0 && num <= 1000) {
        this.num = num;
        this.phrase = phrase;
      }
    }

    return input.match(/^repeat\b/);
  }

  help() {
    return `\`repeat\`: Repeats a phrase between 1-1000 times.
      Usage: \`repeat <NUM> <PHRASE>\``;
  }

  justDont() {
    return `Just don't say "repeat 50 blah"`;
  }

  getResponse() {
    if (this.phrase === null) {
      return this.help();
    }

    let message = '';
    for (let n = 0; n < this.num; n += 1) {
      message += this.phrase + ' ';
    }
    return message.trim();
  }
}

module.exports = { KeywordResponder: RepeatResponder };