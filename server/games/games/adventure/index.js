const { ChatGame } = require('../../chat_game');
const { getLocations } = require('./locations');

const notDone = response => ({ response, isDone: false });
const yesDone = response => ({ response, isDone: true });

class Adventure extends ChatGame {
  constructor(session) {
    super(session);
    this.name = 'adventure';
    this.locations = getLocations(this);
  }

  init() {
    this.score = 100;
    this.turns = 0;
    this.currentLocation = this.locations.START;
  }

  setLocation(location) {
    this.currentLocation = location;
  }

  win(response) {
    this.saveScore();
    return yesDone(
      `I guess you win becase ${response} you got to fall asleep! Goodnight, sweet ${
        this.playerName
      }! Bye! Turns: ${this.turns} Score: ${this.score}`
    );
  }

  testInput(input) {
    const aInput = input.toUpperCase();
    const { response, reduceScore, isDone } = this.currentLocation.getInputResponse(aInput);
    // TODO: convert `win` `die` objcts

    this.score -= reduceScore;
    if (isDone) {
      this.saveScore();
      return this.win(response);
    } else {
      this.turns += 1;
      return notDone(response);
    }
  }

  getRoomDescription() {
    return `${this.currentLocation.description}
${this.currentLocation.instructions}`;
  }

  getWelcome() {
    return this.getRoomDescription();
  }
}

module.exports = { Game: Adventure };
