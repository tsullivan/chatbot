const { KeywordResponder } = require('../keyword_responder');

class SayResponder extends KeywordResponder {
  constructor(input) {
    super(input);
    this.name = 'say';
    this.thingToSay = null;
  }

  testMatch(input) {
    const matches = input.match(/^say (.*)$/);
    if (matches !== null) {
      const [_matched, thingToSay] = matches;
      if (thingToSay.trim() !== '') {
        this.thingToSay = thingToSay;
      }
    }

    return input.match(/^say\b(.*)$/);
  }

  help() {
    return `\`say\`: Type \`say something\` and see what happens.`;
  }

  getResponse() {
    if (this.thingToSay === null) {
      return this.help();
    }

    return this.thingToSay;
  }
}

module.exports = { KeywordResponder: SayResponder };
