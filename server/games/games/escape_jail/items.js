const snl = require('strip-newlines');
const { InventoryItem, KeywordResponse } = require('../../lib');
const { KEY, TOWEL, GUARDS } = require('./constants');

function getItems(game) {
  const keyItem = new InventoryItem({
    name: 'Jail Key',
    id: KEY,
    description: snl`On a hook on a far wall, there is the key to open a jail cell.`,
    setActions: ({ setTakeable }) => {
      setTakeable({
        keyword: ['USE_THE_FORCE_TO_TAKE_JAIL_KEY', 'FORCE_KEY'],
        keywordDescription: 'Use the Force to take the jail cell key.',
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
      });
    },
    seen: false,
    game,
  });
  const towelItem = new InventoryItem({
    name: 'Jail Towel',
    id: TOWEL,
    description: snl`A towel from the jail laundry van.`,
    setActions: ({ setTakeable }) => {
      setTakeable({
        keyword: 'TAKE_TOWEL',
        keywordDescription: 'Take one of the towels from the jail laundry van.',
        fn: () => {
          this.description = 'The jail towel you stole from the jail laundry van.';
          return new KeywordResponse({
            text: snl`You're pretty sure no one will
            miss this towel, so you take it and wrap it around your head.`,
          });
        },
      });
    },
    game,
  });

  // NPC
  const guardsItem = new InventoryItem({
    name: 'Guards',
    id: GUARDS,
    description: snl`Guards are chasing you! They're trying to get you! They want you to stay in jail!`,
    seen: false,
    game,
  });

  return {
    keyItem,
    towelItem,
    guardsItem,
  };
}

function setItemsToLocations(
  { keyItem, towelItem, guardsItem },
  { cellLocation, vanLocation },
  game
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

module.exports = { setItemsToLocations, getItems };
