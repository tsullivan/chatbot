// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, Item, KeywordResponse, Location, parajoin } from '../../../lib';
import { BUBBLE_GUN, LED, NORTH } from '../constants';
import AdventureGame from '../../adventure';

export class BridgeLocation extends Location {
  private isDark: boolean = true;
  private isThrowied: boolean = false;
  private isMagneted: boolean = false;

  public constructor(game: Adventure) {
    super({ game, name: 'The Bridge Out Of Town' });
  }

  public getDescription(game: Adventure) {
    return parajoin([
      snl`This long, long bridge carries the road over a very tall gorge that
      surrounds Bubble Gun World. It is the only way out of town.`,
      [
        snl`There are strange glowing bubbles stuck to all the metal surfaces
        here. The power is still out all over the streets, but magically, the
        bubbles are providing pretty good light!`,
        snl`There's no way out of town right now, Bubble Gun World Police have
        blocked the road to prevent anyone from using the road. A power outage
        in the streets has caused all the street lights to turn off in this
        area. The Police are saying it's too dark and unsafe to let anyone try
        to cross.`,
        snl`Barely visible in the darkness, hundreds of magnets are stuck to
        all the metal surfaces of the bridge.`,
      ][this.isDark ? (this.isMagneted ? 2 : 1) : 0],
      [
        snl`Other than being disturbingly dark and heavily magneted, this is a pretty normal bridge.`,
        snl`Other than being disturbingly dark, this is a pretty normal bridge.`,
      ][this.isMagneted ? 0 : 1],
      snl`The police have put up signs all along the bridge that say BRIDGE IS OUT!` +
        [
          snl` ...but it is kind of too dark to really be able to read them.`,
          snl` The now-obsolete signs are clearly legible in the light of the
          magical glowing bubbles that you blasted. Neat!`,
        ][this.isDark ? 0 : 1],
    ]);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(NORTH);
    });
    // try to cross
    this.addKeyword(
      'CROSS_BRIDGE',
      'Walk over the long, long bridge out of Bubble Gun World',
      () => {
        if (this.isDark) {
          return new KeywordResponse({
            text: snl`The police officers assigned to watch the road here see you
              try to cross, and they don't let you. They tell you it's for your
              "safety."`,
          });
        } else {
          return game.branchToGame(
            AdventureGame,
            parajoin([
              snl`Today, Bubble Gun World Police are in a good mood. It is likely
              because of the magical glowing bubbles which are stuck to almost
              every part of the bridge. Bubbles create joyful feelings in everyones'
              hearts. You are free to cross the bridge. So long, Bubble Gun
              World!`,
              snl`You walk across the bridge. And you walk and walk and keep
              walking. Your legs get tired, then your eyes get tired. Suddenly,
              you wake up in a new place! You have no idea how long you were
              walking in your sleep...`,
            ])
          );
        }
      }
    );

    // allow lighting
    const throwieItem: Item | undefined = game.getItemFromCollection(LED);
    if (game.inInventory(LED) && throwieItem && throwieItem.isComplete()) {
      this.addKeyword(
        'THROW_LED',
        'Throw the LED throwie at stuff in the playground',
        () => {
          this.isThrowied = true;
          if (this.isMagneted) {
            return new KeywordResponse({
              text: parajoin([
                snl`You take the LED throwie in hand, and focus on your target:
                one of the magnets which has been stuck to the playground.
                You wind up your pitch and hurl it mightily at the public use
                structure. It sticks there! Also, you probably didn't need to
                throw as hard as you did. Also, good job being able to see in
                the dark.`,
                snl`Strangely, you still have another LED in your pocket. You
                can benefit from the magical powers of the LED throwie by
                throwing it an infinite number of times.`,
              ]),
            });
          } else {
            return new KeywordResponse({
              text: parajoin([
                snl`You take the LED throwie in hand, and focus. You wind up
                your pitch and hurl it mightily at the public use structure. It
                bounced off! Hmm.`,
                snl`To save you some time, I'll have you pick it up again.
                There you go: you still have it.`,
              ]),
            });
          }
        }
      );
    }

    const bubbleGunItem = game.getItemFromCollection(BUBBLE_GUN);
    if (game.inInventory(BUBBLE_GUN) && bubbleGunItem.isComplete()) {
      this.addKeyword('BUBBLE_BLAST', 'Blast some bubbles at the bridge', () => {
        if (this.isThrowied) {
          this.isDark = false;
          return new KeywordResponse({
            text: snl`Bubbles Blast out! Bubbles are everywhere! They float
            around....and become attracted to all the LED throwies to the
            playground rides! The LED's are now all bubbled up, and it is nice
            and bright here now. So long, shrouded darkness!`,
          });
        } else {
          return new KeywordResponse({
            text: snl`Bubbles Blast out! Bubbles are everywhere! They float around....then pop on on the ground. Hmm.`,
          });
        }
      });
    }
  }

  public magnite() {
    this.isMagneted = true;
  }
}
