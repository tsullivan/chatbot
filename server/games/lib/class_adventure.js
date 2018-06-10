const { ChatGame } = require('../chat_game');
const { getKeywordsHelper } = require('./keywords_helper');
const { KeywordResponse } = require('./class_keyword_response');

function getGameKeywords() {
  return [
    {
      key: ['HINT', 'HELP'],
      description: 'See all the commands you can type',
      fn: game => {
        const parts = [game.currentLocation.getInstructions(), game.getInstructions()];
        return new KeywordResponse({
          text: parts.join('\n\n'),
          showInstructions: false,
        });
      },
    },
    {
      key: 'QUIT',
      description: 'Quit the game',
      fn: () =>
        new KeywordResponse({
          text: `I guess you don't want to hike any more. See ya!`,
          isDone: true,
        }),
    },
  ];
}

class Adventure extends ChatGame {
  constructor(session) {
    super(session);
    Object.assign(this, getKeywordsHelper());

    this.inventory = new Set();
    this.notDone = response => ({ response, isDone: false });
    this.yesDone = response => ({ response, isDone: true });

    // should override
    this.name = 'unknown game';
    this.locations = {};

    this.setKeywords();
  }

  setKeywords() {
    const gameKeywords = getGameKeywords(this);
    gameKeywords.forEach(({ key, description, fn }) => {
      this.addKeyword(key, description, fn);
    });
  }

  win() {
    throw new Error('win method is to override');
  }
  lose() {
    throw new Error('lose method is to override');
  }

  init() {
    this.score = 50;
    this.turns = 0;
  }

  setLocation(location) {
    this.currentLocation = location;
  }

  testInput(input) {
    input = input.toUpperCase();
    let response,
      changeScore,
      isDone = false;

    if (this.currentLocation.hasKeyword(input)) {
      // keyword of location
      ({ response, changeScore, isDone } = this.currentLocation.getInputResponse(input, this));
      this.currentLocation.clearKeywords();
      this.currentLocation.setKeywords(this); // location keywords depend on game state
    } else if (this.hasKeyword(input)) {
      // keyword of game
      ({ response, changeScore, isDone } = this.getInputResponse(input, this));
      this.clearKeywords();
      this.setKeywords();
    } else {
      ({ response } = this.getInputResponse('HELP', this, this));
      response = `ERROR! LOSE 2 POINTS. Type HELP to show all the commands` + '\n\n' + response;
      changeScore = -2;
    }

    this.score += changeScore;

    if (this.score <= 0) {
      return this.lose(response);
    } else if (isDone) {
      return this.win(response);
    } else {
      this.turns += 1;
      return this.notDone(this.getNext(response));
    }
  }

  addToInventory(item) {
    this.inventory.add(item);
  }
  inInventory(item) {
    return this.inventory.has(item);
  }
  dropInventory(item, location) {
    this.inventory.delete(item);
    location.addFloorItem(item);
  }
  deleteInventory(item) {
    this.inventory.delete(item);
  }

  getNext(prefix) {
    return prefix + '\n\n' + this.currentLocation.getInstructions();
  }

  getWelcome() {
    return this.getNext(this.currentLocation.getDescriptionInternal(this));
  }
}

module.exports = { Adventure };
