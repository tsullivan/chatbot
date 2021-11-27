import { snl } from '../../../lib';
import { Adventure, Item, KeywordResponse, Location, parajoin } from '../../lib';
import { BATTERY_AA, BATTERY_LR41, BUBBLE_GUN, LADDER, LED, SOAP } from './constants';

interface ItemArgs {
  description: any;
  name: string;
  setActions?: (
    { setTakeable, setCombinables }: { setTakeable?: any; setCombinables?: any },
    item?: Item
  ) => void;
}

type CombinedSet = Set<string>;

const bubbleGunCombinings = (item: Item, combinedSet: CombinedSet) => {
  const lns = [];
  if (combinedSet.has(BATTERY_AA)) {
    item.setDescription(`Bubble gun with batteries, but no soap.`);
    lns.push(
      snl`You slide off the cover to the bubble gun, pop in the AA batteries, and put the cover back on. It's nice and snug with the water seal that will
      prevent corrosion in the batteries or the metal surfaces inside the bubble gun's battery compartment.`
    );
  } else if (combinedSet.has(SOAP)) {
    item.setDescription(`Bubble gun with soap, but no AA batteries.`);
    lns.push(
      snl`You open up the cap on the bubble gun and fill up its soap container with your liquid soap. Glug glug glug.`
    );
  }
  if (item.isComplete()) {
    item.setDescription('Completely functional and working bubble gun');
    lns.push(`The bubble gun is completely functional now!`);
  }
  return lns;
};
const throwieCombinings = (item: Item, combinedSet: CombinedSet) => {
  const lns = [];
  if (combinedSet.has(BATTERY_LR41)) {
    item.setDescription(
      snl`LED throwie that has batteries, but you can't do anything else with it.`
    );
    lns.push(
      snl`The batteries go right on in to the LED's battery holder. Nice and simple.`
    );
  }
  if (item.isComplete()) {
    item.setDescription('Completely functional and working LED throwie');
    lns.push(`The LED Throwie is completely functional now!`);
  }
  return lns;
};

const getCombiningResponse = (item: Item, combinedSet: CombinedSet) => {
  const id = item.getId();
  if (id === BUBBLE_GUN) {
    const lns = bubbleGunCombinings(item, combinedSet);
    return new KeywordResponse({ text: parajoin(lns) });
  } else if (id === LED) {
    const lns = throwieCombinings(item, combinedSet);
    return new KeywordResponse({ text: parajoin(lns) });
  }
  throw new Error('Tried to get response for item that could not be combined');
};

export function getItems(game: Adventure) {
  const itemFactory = (id: string, itemArgs: ItemArgs) => {
    const factoryArgs = { ...itemArgs, id, game };
    return new Item(factoryArgs);
  };

  return {
    batteryAaItem: itemFactory(BATTERY_AA, {
      description: snl`The two AA batteries are the standard 1.5V medium-size batteries. They'd fit nicely into the battery holder of a medium-size piece of electronics.`,
      name: 'Medium-size AA Batteries.',
      setActions: ({ setTakeable }) => {
        setTakeable({
          fn: () =>
            new KeywordResponse({
              text: snl`The AA batteries are now yours!`,
            }),
          keyword: 'TAKE_AA_BATTERIES',
          keywordDescription: 'Obtain possession of the AA batteries.',
        });
      },
    }),
    batteryLr41Item: itemFactory(BATTERY_LR41, {
      description: snl`The two LR41 batteries are the standard 1.5V button size batteries. They'd fit nicely into the battery holder of a very small piece of electronics.`,
      name: 'Small LR41 Batteries.',
      setActions: ({ setTakeable }) => {
        setTakeable({
          fn: () =>
            new KeywordResponse({
              text: snl`The LR41 batteries are now yours!`,
            }),
          keyword: 'TAKE_LR41_BATTERIES',
          keywordDescription: 'Obtain possession of the LR41 batteries.',
        });
      },
    }),
    bubbleGunItem: itemFactory(BUBBLE_GUN, {
      description: snl`It's a bubble gun for gunning out bubbles. If you have soap and two AA batteries, it can fulfill the purpose of its existence.`,
      name: 'Bubble Gun',
      setActions: ({ setTakeable, setCombinables }, _item: Item) => {
        setTakeable({
          fn: () =>
            new KeywordResponse({
              text: snl`The bubble gun is yours, as it was meant to be!`,
            }),
          keyword: 'TAKE_BUBBLE_GUN',
          keywordDescription: 'Pick up bubble gun.',
        });
        setCombinables([
          {
            combinesWith: BATTERY_AA,
            fn: (bubbleGunItem: Item, combinedSet: CombinedSet) =>
              getCombiningResponse(bubbleGunItem, combinedSet),
            keyword: 'COMBINE_BUBBLE_GUN_AND_BATTERIES',
            keywordDescription: 'Put the AA batteries in the bubble gun.',
          },
          {
            combinesWith: SOAP,
            fn: (bubbleGunItem: Item, combinedSet: CombinedSet) =>
              getCombiningResponse(bubbleGunItem, combinedSet),
            keyword: 'COMBINE_BUBBLE_GUN_AND_SOAP',
            keywordDescription: snl`Put the soap into the soap container of the bubble gun.`,
          },
        ]);
      },
    }),
    ladderItem: itemFactory(LADDER, {
      description: snl`This is one sturdy ladder. The bottom part of the ladder is on the ground, and the top part of the ladder leads to the tree fort.`,
      name: 'Ladder',
    }),
    ledItem: itemFactory(LED, {
      description: snl`A semiconductor diode which glows when a voltage is applied. It's an LED connected to a circuit board for making it flashy, and battery holder for LR41s.`,
      name: 'Light-emitting Diode',
      setActions: ({ setTakeable, setCombinables }) => {
        setTakeable({
          fn: () =>
            new KeywordResponse({
              text: parajoin([
                snl`The LED is now yours, and yours alone.`,
                snl`Hmm. Something about this LED seems magical.`,
              ]),
            }),
          keyword: 'TAKE_LED',
          keywordDescription: 'Take the LED.',
        });
        setCombinables([
          {
            combinesWith: BATTERY_LR41,
            fn: (ledItem: Item, combinedSet: CombinedSet) => getCombiningResponse(ledItem, combinedSet),
            keyword: 'COMBINE_LED_AND_BATTERIES',
            keywordDescription:
              'Put the two LR41 batteries in the battery holder of the LED device.',
          },
        ]);
      },
    }),
    soapItem: itemFactory(SOAP, {
      description: snl`This small bottle of liquid soap has more than enough liquid for a bubble gun to shoot out plenty of bubbles.`,
      name: 'Bottle of liquid soap',
      setActions: ({ setTakeable }) => {
        setTakeable({
          fn: () =>
            new KeywordResponse({
              text: snl`Did you forget that I said everything in this town is FREE!? Oh well. You wanted the soap, you got it. It's your problem now.`,
            }),
          keyword: ['STEAL_THE_SOAP', 'TAKE_SOAP'],
          keywordDescription: 'Help yourself to the bottle of liquid soap.',
        });
      },
    }),
  };
}

export function setItemsToLocations(
  {
    bubbleGunItem,
    ladderItem,
    batteryLr41Item,
    batteryAaItem,
    soapItem,
    ledItem,
  }: {
    [itemName: string]: Item;
  },
  {
    playgroundLocation,
    electronicsLocation,
    soapLocation,
  }: {
    [itemName: string]: Location;
  },
  game: Adventure
) {
  // set everything into the game collection
  game.addItemToCollection(BUBBLE_GUN, bubbleGunItem);
  game.addItemToCollection(LADDER, ladderItem);
  game.addItemToCollection(BATTERY_LR41, batteryLr41Item);
  game.addItemToCollection(BATTERY_AA, batteryAaItem);
  game.addItemToCollection(SOAP, soapItem);
  game.addItemToCollection(LED, ledItem);

  // starting inventory items
  game.addToInventory(BUBBLE_GUN);

  // starting location items
  playgroundLocation.addFloorItem(LADDER);

  electronicsLocation.addFloorItem(BATTERY_LR41);
  electronicsLocation.addFloorItem(BATTERY_AA);
  electronicsLocation.addFloorItem(LED);

  soapLocation.addFloorItem(SOAP);
}
