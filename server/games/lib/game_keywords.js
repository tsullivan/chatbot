const { KeywordResponse } = require('./class_keyword_response');

function getGameKeywords() {
  return [
    {
      key: 'ITEMS',
      description: 'Actions you can do on stuff.',
      fn: game => {
        const inventoryItems = game.getVisibleInventoryItems();
        const inventoryItemsHelp = inventoryItems
          .reduce((accum, item) => {
            if (item.hasKeywords()) {
              return [...accum, item.getInstructions()];
            }
            return accum;
          }, [])
          .join('\n');

        const locationItemsHelp = game.currentLocation
          .getFloorItems()
          .map(item => item.getInstructions())
          .join('\n');

        let itemsHelp;
        if (inventoryItemsHelp !== '' && locationItemsHelp !== '') {
          itemsHelp = [inventoryItemsHelp, locationItemsHelp].join('\n\n');
        } else {
          itemsHelp = inventoryItemsHelp || locationItemsHelp;
        }

        if (itemsHelp === '') {
          return new KeywordResponse({
            text: `There aren't any items around or in your pocket that you can do anything with right now.`,
          });
        }

        return new KeywordResponse({ text: itemsHelp });
      },
    },
    {
      key: 'HELP',
      description: 'See all the commands you can type',
      fn: game => {
        const parts = [game.currentLocation.getInstructions(), game.getInstructions()];
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
