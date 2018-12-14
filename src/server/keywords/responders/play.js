const { KeywordResponder } = require('../class_keyword_responder');
const { getGames } = require('../../games');

const games = getGames();

class GameResponder extends KeywordResponder {
  constructor(input, session) {
    super(input);
    this.name = 'play';
    this.setFormat('markdown');

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

  justDont() {
    return `Just don't say "play batman"`;
  }

  help() {
    const gameKeys = Object.keys(games);
    return `\`play\`: Play a game with me!\nUsage: \`play <game name>\`\nHere are the games I have: ${gameKeys.join(
      ', '
    )}`;
  }
}

module.exports = { KeywordResponder: GameResponder };
