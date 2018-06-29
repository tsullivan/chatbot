const snl = require('strip-newlines');
const { KeywordResponse } = require('./class_keyword_response');
const { ItemCollection } = require('./class_item_collection');

function getGameKeywords() {
  return [
    {
      key: 'LOOK',
      description: 'Look at the area you are currently in.',
      fn: game => {
        // get the area description + the available keyword commands
        return new KeywordResponse({
          text: game.currentLocation.getDescriptionInternal(game),
          isCascade: true,
        });
      },
    },
    {
      key: 'ITEMS',
      description: snl`Things you can do with stuff you are holding or stuff
        you see.`,
      fn: game => {
        const text = ItemCollection.describeGameItems(game);
        return new KeywordResponse({
          text:
            text ||
            snl`There aren't any items around or that you are holding that
              you can do anything with right now.`,
        });
      },
    },
    {
      key: 'HELP',
      description: 'See all the commands you can type',
      fn: game => {
        const parts = [game.getLocationInstructions(), game.getInstructions()];
        return new KeywordResponse({
          text: parts.join('\n'),
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
