const snl = require('strip-newlines');
const { parajoin } = require('./parajoin');
const { KeywordResponse } = require('./class_keyword_response');

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
      description: 'Things you can do with stuff you are holding or stuff you see.',
      fn: game => {
        const invItems = game.getVisibleInventoryItems();
        const invItemsInfos = invItems
          .reduce((accum, item) => {
            return [...accum, item.getInfo()];
          }, [])
          .join('\n');

        const locItems = game.currentLocation.getVisibleFloorItems(game);
        const locItemsHelp = parajoin(locItems.map(item => item.getInfo()));

        const invPre = 'Stuff you are holding:\n';
        const locPre = 'Stuff you can see:\n';
        let itemsHelp;

        if (invItems.length > 0 && locItems.length > 0) {
          itemsHelp = parajoin([invPre + invItemsInfos, locPre + locItemsHelp]);
        } else {
          itemsHelp =
            (invItems.length > 0 && invPre + invItemsInfos) ||
            (locItems.length > 0 && locPre + locItemsHelp) ||
            '';
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
