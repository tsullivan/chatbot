const { KeywordResponder } = require('../keyword_responder');
const { getMessage } = require('../get_message');

class RepeatResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'repeat';
    this.phrase = null;
  }

  testMatch(input) {
    const _matches = input.match(/^repeat ([0-9]+) ([\S ]+)$/);
    if (_matches !== null) {
      const [ _matched, num, phrase ] = _matches; //eslint-disable-line no-unused-vars
      if (num > 0 && num <= 1000) {
        this.num = num;
        this.phrase = phrase;
      }
    }

    return input.match(/^repeat\b/);
  }

  help() {
    return getMessage(
      'help',
      `\`repeat\`: Repeats a phrase between 1-1000 times. 
      Usage: \`repeat <NUM> <PHRASE>\``
    );
  }

  getResponse() {
    if (this.phrase === null) {
      return this.help();
    }

    let message = '';
    for (let n = 0; n <= this.num; n += 1) {
      message += this.phrase + ' ';
    }
    return getMessage('plain', message);
  }
}

module.exports = { Responder: RepeatResponder };
