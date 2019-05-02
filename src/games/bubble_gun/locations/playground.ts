// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Item, KeywordResponse, Location, parajoin, Adventure } from '../../lib';
import { BUBBLE_GUN, EAST, LED, NORTH, SOUTH, UP, WEST } from '../constants';

export class PlaygroundLocation extends Location {
  private isDark: boolean = true;
  private isThrowied: boolean = false;
  private isMagneted: boolean = false;

  public constructor(game: Adventure) {
    super({ game, name: 'The Playground' });
  }

  public getDescription(game: Adventure) {
    return parajoin([
      snl`This playground is right in the center of Bubble Gun World. It has things that are fun for kids, and there's a ladder to a tree fort!!!`,
      snl`Off the corner of the road, there's a bridge leading out of Bubble Gun World.`,
      snl`Nearby is also an Electronics store, a Soaps store, and a Magnets store. I hope you like stores! There are a lot of stores in this game. But guess
      what: everything in them is FREE!!`,
      [
        snl`Bubble Gun world is very dark right now. All the power seems to be off in this entire neighborhood.`,
        snl`Bubble Gun world is still sort-of dark out. All the power is still off, but now there is a nice ambient light coming from LEDs which are stuck to
        metal structures of the playground with magnets, and surrounded by soapy bubbles.`,
      ][this.isDark ? 0 : 1],
      [
        snl`It's a pretty normal-looking playground, with the typical offerings of swings, a slide, and jungle gyms. There's even a tree fort!`,
        snl`Hundreds of magnets are stuck to all the metal surfaces of the playground.`,
        snl`LED throwies are stuck to hundreds of magnets which cover all the metal surfaces of the playground. The LED's are making this place look really nice!`,
      ][this.isMagneted ? this.isThrowied ? 2 : 1 : 0],
    ]);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('BRIDGE', 'Go to the bridge', () => {
      return this.followExit(SOUTH);
    });
    this.addKeyword('TREE_FORT', 'Climb the ladder up to the tree fort', () => {
      return this.followExit(UP);
    });
    this.addKeyword('ELECTRONICS', 'Go to the Electronics store', () => {
      return this.followExit(WEST);
    });
    this.addKeyword('SOAPS', 'Go to the Soaps store', () => {
      return this.followExit(NORTH);
    });
    this.addKeyword('MAGNETS', 'Go to the Magnet store', () => {
      return this.followExit(EAST);
    });

    const throwieItem: Item | undefined = game.getItemFromCollection(LED);
    if (game.inInventory(LED) && throwieItem && throwieItem.isComplete()) {
      this.addKeyword('THROW_LED', 'Throw the LED throwie at stuff in the playground', () => {
        if (this.isMagneted) {
          this.isThrowied = true;
          this.isDark = false;
          return new KeywordResponse({
            text: parajoin([
              snl`You take the LED throwie in hand, and focus on your target: one of the magnets which has been stuck to the playground. You wind up your pitch
              and hurl it mightily at the public use structure. It sticks there! Also, you probably didn't need to throw as hard as you did. Also, good job
              being able to see in the dark.`,
              snl`Strangely, you still have another LED in your pocket. You can benefit from the magical powers of the LED throwie by throwing it an infinite
              number of times.`,
            ]),
          });
        } else {
          return new KeywordResponse({
            text: parajoin([
              snl`You take the LED throwie in hand, and focus. You wind up your pitch and hurl it mightily at the public use structure. It bounced off! Hmm.`,
              snl`To save you some time, I'll have you pick it up again. There you go: you still have it.`,
            ]),
          });
        }
      });
    }

    const bubbleGunItem = game.getItemFromCollection(BUBBLE_GUN);
    if (game.inInventory(BUBBLE_GUN) && bubbleGunItem.isComplete()) {
      this.addKeyword('BUBBLE_BLAST', 'Blast some bubbles at the bridge', () => {
        if (this.isThrowied) {
          return new KeywordResponse({
            text: snl`Bubbles Blast out! Bubbles are everywhere! They float around....and become attracted to all the LED throwies to the playground rides! The
            LED's are now all bubbled up, and it is nice and bright here now. So long, shrouded darkness!`,
          });
        } else {
          return new KeywordResponse({
            text: snl`Bubbles Blast out! Bubbles are everywhere! They float around....then pop on on the ground. Hmm.`,
          });
        }
      });
    }

  }

  // this state will change fom outside caller
  public magnite() {
    this.isMagneted = true;
  }
}
