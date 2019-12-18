import { Adventure } from './adventure';
import { ItemCollection } from './item_collection';
import { KeywordResponse } from './keyword_response';
import { parajoin } from './parajoin';

interface GameKeywordOpts {
  key: string;
  description: string;
  fn: (game?: Adventure) => KeywordResponse;
}

export function getGameKeywords(): GameKeywordOpts[] {
  return [
    {
      description: 'Look at the area you are currently in.',
      fn: game => {
        // get the area description + the available keyword commands
        const descriptionInternal = game
          .getCurrentLocation()
          .getDescriptionInternal(game);
        const itemsInternal = ItemCollection.describeGameItems(game);
        return new KeywordResponse({
          isCascade: true,
          text: parajoin([descriptionInternal, itemsInternal].filter(Boolean)), // (2)
        });
      },
      key: 'LOOK',
    },
    {
      description: `Things you can do with stuff you are holding or stuff you see.`,
      fn: game => {
        const text = ItemCollection.describeGameItemsFull(game); // 3
        return new KeywordResponse({
          text: text || `There aren't any items around or that you are holding that you can do anything with right now.`,
        });
      },
      key: 'ITEMS',
    },
    {
      description: 'See all the commands you can type',
      fn: game => {
        const parts = [game.getLocationInstructions(), game.getInstructions()];
        return new KeywordResponse({
          showInstructions: false,
          text: parts.join('\n'),
        });
      },
      key: 'HELP',
    },
    {
      description: 'Quit the game',
      fn: () =>
        new KeywordResponse({
          isDone: true,
          text: `I guess you don't want to hike any more. See ya!`,
        }),
      key: 'QUIT',
    },
  ];
}
