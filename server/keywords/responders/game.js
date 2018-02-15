const { KeywordResponder } = require('../keyword_responder');
const { getGames } = require('../../games');

const games = getGames();

class GameResponder extends KeywordResponder {
  constructor(input, session) {
    super(input);
    this.name = 'game';


    this.getResponse = () => {
      const game = input.replace(/^play /, '');
      if (Object.keys(games).includes(game)) {
        session.setGame(game);
        return session.getGameWelcome();
      } else {
        return this.help();
      }
    };
  }

  testMatch(input) {
    return input.match(/^play\b/);
  }

  help() {
    const gameKeys = Object.keys(games);
    return (
      `\`play\`: Play a game with me!\nUsage: \`play <game name>\`\nHere are the games I have: ${gameKeys.join(', ')}`
    );
  }

  isImpromptu() {
    return false;
  }
}

module.exports = { KeywordResponder: GameResponder };
