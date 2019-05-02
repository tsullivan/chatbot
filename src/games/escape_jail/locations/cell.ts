// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { KeywordResponse, Location, Adventure } from '../../lib';
import { KEY, SOUTH } from '../constants';

export class CellLocation extends Location {
  private guardsWatching = false;
  private forceAware = false;

  public constructor(game: Adventure) {
    super({ game, name: 'The Jail Cell' });
    this.guardsWatching = true;
    this.forceAware = false;
  }

  public getDescription(game: Adventure) {
    const desc = [
      snl`You're locked up securely in a jail cell. A hole in the ceiling
        marks where you crashed through accidentally when you got here.`,
    ];
    if (!this.forceAware) {
      desc.push(snl`There is a jail key on a far wall across the hallway from
                your jail cell.`);
    }
    return desc.join('\n\n');
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('ESCAPE', `Escape from the cell`, () => {
      if (!this.guardsWatching && game.inInventory(KEY)) {
        const px = snl`You use the key to open the cell door, and quietly walk out.`;
        return this.followExit(SOUTH, px);
      }

      if (this.guardsWatching) {
        return new KeywordResponse({
          text: 'You can not escape while the guards are watching!',
        });
      }
      if (!game.inInventory(KEY)) {
        return new KeywordResponse({
          text: 'The door is locked.',
        });
      }
      return new KeywordResponse({
        text: 'You still need to escape.',
      });
    });
    if (!this.forceAware) {
      const key = game.getItemFromCollection(KEY);
      this.addKeyword(
        'TAKE_JAIL_KEY',
        `Somehow take the jail key from the wall.`,
        () => {
          this.forceAware = true;
          key.see();
          const res = [
            snl`The key is on a wall far out of reach of your cell bars.
            You have to be really sneaky to take the it. Hmm. how to do
            this?`,
            snl`You hear a voice calling to you. "Use the FORCE, ${game.getPlayerName()}."`,
            snl`Who said that? The Force? What is that??`,
          ];
          return new KeywordResponse({ text: res.join('\n\n') });
        },
      );
    }

    if (this.guardsWatching) {
      this.addKeyword('WAIT', `Wait for the guards to stop watching you.`, () => {
        this.guardsWatching = false;
        return new KeywordResponse({
          text: snl`You pretend not to notice the guards watching you. They
            watch you for a little bit, then walk away to watch other prisoners.`,
        });
      });
    } else {
      this.addKeyword(
        ['STAND_AROUND', 'WAIT'],
        snl`Stand around and let the weight of feeling of excitement, exersion,
          and curiousity resolve itself in your mind before deciding on something
          clever to do`,
        () => {
          this.guardsWatching = true;
          return new KeywordResponse({
            text: snl`You stand around, doing nothing for awhile, The guards
              come back on watch duty near your cell and start watch you some
              more.`,
          });
        },
      );
    }
  }
}

