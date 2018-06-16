const snl = require('strip-newlines');
const { KeywordResponse } = require('./class_keyword_response');

function getGameKeywords() {
  return [
    {
      key: 'LOOK',
      description: 'Look at the area you are currently in.',
      fn: game => {
        const ps = [];
        // get the area description
        ps.push(game.currentLocation.getDescriptionInternal(game));

        // show any items on the floor
        const {
          itemsCount: locItemsCount,
          itemsHelp: locItemsHelp,
        } = game.currentLocation.getVisibleFloorItems(game).reduce(
          ({ itemsHelp, itemsCount }, item) => {
            let instructions = item.getInstructions(' - ');
            if (instructions) {
              instructions = '\n' + instructions;
            }
            return {
              itemsCount: itemsCount + 1,
              itemsHelp: itemsHelp.concat(
                `${item.getName()} - ${item.getDescription()}${instructions}`
              ),
            };
          },
          { itemsHelp: [], itemsCount: 0 }
        );

        if (locItemsCount > 0) {
          let itemsPre = `There is an item here you may be interested in:`;
          if (locItemsCount > 1) {
            itemsPre = `There are ${locItemsCount} items here you may be interested in:`;
          }
          ps.push(itemsPre + '\n' + locItemsHelp);
        }

        return new KeywordResponse({
          text: ps.join('\n\n'),
          isCascade: true,
        });
      },
    },
    {
      key: 'ITEMS',
      description: 'Things you can do with stuff you are holding or stuff you see.',
      fn: game => {
        const invItems = game.getVisibleInventoryItems();
        const invItemsHelp = invItems
          .reduce(
            (accum, item) => (item.hasKeywords() && [...accum, item.getInstructions()]) || accum,
            []
          )
          .join('\n');

        const locItems = game.currentLocation.getVisibleFloorItems(game);
        const locItemsHelp = locItems.map(item => item.getInstructions()).join('\n');

        const invPre = 'Stuff you are holding:\n';
        const locPre = 'Stuff you can see:\n';
        let itemsHelp;

        if (invItems.length > 0 && locItems.length > 0) {
          itemsHelp = [invPre + invItemsHelp, locPre + locItemsHelp].join('\n\n');
        } else {
          itemsHelp =
            (invItems.length > 0 && invPre + invItemsHelp) ||
            (locItems.length > 0 && locPre + locItemsHelp);
        }

        if (itemsHelp === '') {
          return new KeywordResponse({
            text: snl`There aren't any items around or that you are holding
              that you can do anything with right now.`,
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
