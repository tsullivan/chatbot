const { KeywordResponse } = require('./class_keyword_response');

function getGameKeywords() {
  return [
    {
      key: 'HELP',
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

module.exports = { getGameKeywords };
