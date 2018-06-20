const snl = require('strip-newlines');
const { InventoryItem, KeywordResponse } = require('../../lib');

const {
  BUBBLE_GUN,
  SLINGSHOT,
  LADDER,
  BATTERY_AA,
  BATTERY_LR41,
  SOAP,
  LED,
  MAGNET,
  GARBAGE,
} = require('./constants');

function getItems(game) {
  const itemFactory = (id, itemArgs) => {
    const factoryArgs = Object.assign({}, itemArgs, { id, game });
    return new InventoryItem(factoryArgs);
  };

  return {
    bubbleGunItem: itemFactory(BUBBLE_GUN, {
      name: 'Bubble Gun',
      description: snl`It's a bubble gun for gunning out bubbles. If you have
        soap and two AA batteries, it can fulfil the purpose of its existence.`,
      setActions: ({ setTakeable, setCombinable }) => {
        setTakeable({
          keyword: 'TAKE_BUBBLE_GUN',
          keywordDescription: 'Pick up bubble gun.',
          fn: () =>
            new KeywordResponse({
              text: `The bubble gun is yours!`,
            }),
        });
        // TODO create functioning bubble gun item
        setCombinable({
          combinesWith: BATTERY_AA,
          keyword: 'COMBINE_BUBBLE_GUN_AND_BATTERIES',
          keywordDescription: 'Put the AA batteries in the bubble gun.',
          fn: (_game, _combinedWith) =>
            new KeywordResponse({
              text: snl`You unscrew the cover to the bubble gun, pop in the AA
              batteries, and put the cover back on. It's nice and snug with the
              water seal that will prevent corrosion in the batteries or the
              metal surfaces inside the bubble gun's battery compartment.`,
            }),
        });
        setCombinable({
          combinesWith: SOAP,
          keyword: 'COMBINE_BUBBLE_GUN_AND_SOAP',
          keywordDescription: snl`Put the soap into the soap container of the bubble gun.`,
          fn: (_game, _combinedWith) =>
            new KeywordResponse({
              text: snl`You fill up the bubble gun soap container with some of
                the liquid soap.`,
            }),
        });
      },
    }),
    slingShotItem: itemFactory(SLINGSHOT, {
      name: 'Slingshot',
      description: snl`This slingshot seems like it could really sling some
      shots.`,
    }),
    ladderItem: itemFactory(LADDER, {
      name: 'Ladder',
      description: snl`This is one sturdy ladder. The bottom part of the ladder
        is on the ground, and the top part of the ladder leads to the tree fort.`,
    }),
    batteryAaItem: itemFactory(BATTERY_AA, {
      name: 'Medium-size AA Batteries.',
      description: snl`The two AA batteries are the standard 1.5V medium-size
        batteries. They'd fit nicely into the battery holder of a medium-size
        piece of electronics.`,
      setActions: ({ setTakeable }) => {
        setTakeable({
          keyword: 'TAKE_AA_BATTERIES',
          keywordDescription: 'Obtain possession of the AA batteries.',
          fn: () =>
            new KeywordResponse({
              text: `The AA batteries are now yours!`,
            }),
        });
      },
    }),
    soapItem: itemFactory(SOAP, {
      name: 'Bottle of liquid soap',
      description: snl`This small bottle of liquid soap has more than enough
        liquid for a bubble gun to shoot out plenty of bubbles.`,
      setActions: ({ setTakeable }) => {
        setTakeable({
          keyword: 'TAKE_SOAP',
          keywordDescription: 'Help yourself to the bottle of liquid soap.',
          fn: () =>
            new KeywordResponse({
              text: `You wanted the soap, you got it. It's your problem now.`,
            }),
        });
      },
    }),
    ledItem: itemFactory(LED, {
      name: 'LED',
      description: `It's an LED connected to a circuit board for making it flashy, and battery holder for LR41s.`,
      setActions: ({ setTakeable, setCombinable }) => {
        setTakeable({
          keyword: 'TAKE_LED',
          keywordDescription: 'Take the LED.',
          fn: () =>
            new KeywordResponse({
              text: `The LED is now yours, and yours alone.`,
            }),
        });
        // TODO create throwie item
        setCombinable({
          combinesWith: MAGNET,
          keyword: 'COMBINE_LED_AND_MAGNET',
          keywordDescription: 'Stick the magnet onto the LED device.',
          fn: (_game, _combinedWith) =>
            new KeywordResponse({
              text: snl`The LED device now has magnet powers!`,
            }),
        });
        setCombinable({
          combinesWith: BATTERY_LR41,
          keyword: 'COMBINE_LED_AND_BATTERIES',
          keywordDescription:
            'Put the two LR41 batteries in the battery holder of the LED device.',
          fn: (_game, _combinedWith) =>
            new KeywordResponse({
              text: snl`The LED device is now powered with 3V of electric current!`,
            }),
        });
      },
    }),
    magnetItem: itemFactory(MAGNET, {
      name: 'Small magnet',
      description: snl`This looks like a pretty handy little small magent! It
        has a sticker on for sticking onto a small device.`,
      setActions: ({ setTakeable }) => {
        setTakeable({
          keyword: 'TAKE_MAGNET',
          keywordDescription: 'Take the magnet.',
          fn: () =>
            new KeywordResponse({
              text: `I'm feeling generous, so I'm going to just let you have
                the magnet. It's now yours!`,
            }),
        });
      },
    }),
    batteryLr41Item: itemFactory(BATTERY_LR41, {
      name: 'Small LR41 Batteries.',
      description: snl`The two LR41 batteries are the standard 1.5V button size
        batteries. They'd fit nicely into the battery holder of a very small
        piece of electronics.`,
      setActions: ({ setTakeable }) => {
        setTakeable({
          keyword: 'TAKE_LR41_BATTERIES',
          keywordDescription: 'Obtain possession of the LR41 batteries.',
          fn: () =>
            new KeywordResponse({
              text: `The LR41 batteries are now yours!`,
            }),
        });
      },
    }),
    garbageItem: itemFactory(GARBAGE, {
      name: 'Garbage',
      description: `Just a pile of stinky garbage.`,
    }),
  };
}

function setItemsToLocations(
  {
    bubbleGunItem,
    ladderItem,
    batteryLr41Item,
    batteryAaItem,
    soapItem,
    slingShotItem,
    magnetItem,
    ledItem,
    garbageItem,
  },
  {
    playgroundLocation,
    electronicsLocation,
    soapLocation,
    magnetLocation,
    // garbageLocation,
  },
  game
) {
  // set everything into the game collection
  game.addItemToCollection(BUBBLE_GUN, bubbleGunItem);
  game.addItemToCollection(SLINGSHOT, slingShotItem);
  game.addItemToCollection(LADDER, ladderItem);
  game.addItemToCollection(BATTERY_LR41, batteryLr41Item);
  game.addItemToCollection(BATTERY_AA, batteryAaItem);
  game.addItemToCollection(SOAP, soapItem);
  game.addItemToCollection(MAGNET, magnetItem);
  game.addItemToCollection(LED, ledItem);
  game.addItemToCollection(GARBAGE, garbageItem);

  // starting inventory items
  game.addToInventory(BUBBLE_GUN);
  game.addToInventory(SLINGSHOT);

  // starting location items
  playgroundLocation.addFloorItem(LADDER);

  electronicsLocation.addFloorItem(BATTERY_LR41);
  electronicsLocation.addFloorItem(BATTERY_AA);
  electronicsLocation.addFloorItem(LED);

  soapLocation.addFloorItem(SOAP);
  magnetLocation.addFloorItem(MAGNET);
  // garbageLocation.addFloorItem(GARBAGE);
}

module.exports = { setItemsToLocations, getItems };
