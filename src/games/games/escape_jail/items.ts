// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, Item, KeywordResponse, Location } from '../../lib';
import { GUARDS, KEY, TOWEL } from './constants';

export function getItems(game: Adventure) {
  const keyItem = new Item({
    description: snl`On a hook on a far wall, there is the key to open a jail cell.`,
    game,
    id: KEY,
    name: 'Jail Key',
    seen: false,
    setActions: ({ setTakeable }) => {
      setTakeable({
        fn: () => {
          this.description = 'The jail key you force-stole from the jail.';
          const resp = [
            snl`No time for questions. Time for escaping. You decide to put
              your trust in the mysterious voice. You close your eyes, and
              imagine the jail key floating up, off its hook, drift quietly
              through the air, and land in your open hand.`,
            snl`When you open your eyes, the jail key is in your hand.`,
          ];
          return new KeywordResponse({ text: resp.join('\n\n') });
        },
        keyword: ['USE_THE_FORCE_TO_TAKE_JAIL_KEY', 'FORCE_KEY'],
        keywordDescription: 'Use the Force to take the jail cell key.',
      });
    },
  });
  const towelItem = new Item({
    description: snl`A towel from the jail laundry van.`,
    game,
    id: TOWEL,
    name: 'Jail Towel',
    setActions: ({ setTakeable }) => {
      setTakeable({
        fn: () => {
          this.description = 'The jail towel you stole from the jail laundry van.';
          return new KeywordResponse({
            text: `You're pretty sure no one will miss this towel, so you take it and wrap it around your head.`,
          });
        },
        keyword: 'TAKE_TOWEL',
        keywordDescription: 'Take one of the towels from the jail laundry van.',
      });
    },
  });

  // NPC
  const guardsItem = new Item({
    description: `Guards are chasing you! They're trying to get you! They want you to stay in jail!`,
    game,
    id: GUARDS,
    name: 'Guards',
    seen: false,
  });

  return {
    guardsItem,
    keyItem,
    towelItem,
  };
}

export function setItemsToLocations(
  { keyItem, towelItem, guardsItem }: { [itemKey: string]: Item },
  { cellLocation, vanLocation }: { [locationKey: string]: Location },
  game: Adventure
) {
  /*
   * Set to game
   */
  game.addItemToCollection(KEY, keyItem);
  game.addItemToCollection(TOWEL, towelItem);
  game.addItemToCollection(GUARDS, guardsItem);

  // starting inventory items
  game.addToInventory(GUARDS);

  // starting location items
  cellLocation.addFloorItem(KEY);
  vanLocation.addFloorItem(TOWEL);
}
