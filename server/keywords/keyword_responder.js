const { getMessage } = require('./get_message');

class KeywordResponder {

  constructor(input) {
    this.input = input;
  }

  help() {
    return getMessage('help', 'Help is not implemented!');
  }

  getResponse(input) {
    if (input === '') {
      return this.help();
    }
    return getMessage('plain', 'Not interesting');
  }

}

module.exports = { KeywordResponder };
