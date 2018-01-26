const { KeywordResponder } = require('./keyword_responder');
const { getMessage } = require('./get_message');

class RepeatResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.phrase = null;
  }

  inputMatches() {
    let matches;
    matches = this.input.match(/^repeat help$/);
    if (matches !== null && matches[0] !== '') {
      return true;
    }

    matches = this.input.match(/^repeat ([0-9]+) ([\S ]+)$/);
    if (matches !== null && matches[0] !== '') {
      const [ _matchedPortion, num, phrase ] = matches; //eslint-disable-line no-unused-vars
      if (num > 0 && num <= 1000) {
        this.num = num;
        this.phrase = phrase;
        return true;
      }
      return true; // show help
    }

    return false;
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
