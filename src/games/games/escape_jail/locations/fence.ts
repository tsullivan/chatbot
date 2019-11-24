// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, Location, delayAndDie, parajoin } from '../../../lib';
import BubbleGunWorldGame from '../../bubble_gun';

export class FenceLocation extends Location {
  private jumped = false;
  private climbed = false;

  public constructor(game: Adventure) {
    super({ game, name: 'The Jail Fence' });
  }

  public getDescription(game: Adventure) {
    const nls = [
      snl`You've just escaped from a jail. You breathe a sigh of relief
        because that part of your life is forever behind you. They'll never
        find you in these woods. Plus, you stole the jail key, because you're
        not a bad guy. You were put in jail accidentally. They made you steal
        the key.`,
      snl`Now, all you have to do is get over this fence...`,
      snl`To be honest, it's a little scary right now because you really
        don't know what's out here. And there's cops chasing you, but they're
        far behind. You have the Force and you can go super fast...`,
      snl`You're at the huge fence that goes all around the jail and keeps
        the prisoners inside. It's very tall and you would have to be a really
        good climber or a really good jumper, or both, to get over this thing.
        And you would have to be really really good to do it without getting
        noticed by a guard!`,
    ];
    return nls.join('\n\n');
  }

  public setLocationKeywords(game: Adventure) {
    if (!this.jumped) {
      this.addKeyword(['JUMP_THE_FENCE', 'JUMP'], `Jump over the jail fence`, () => {
        this.jumped = true;
        return new KeywordResponse({
          text: snl`JUUUUMP! Oh no! The top of the fence is still too high up to jump over.`,
        });
      });
    }
    if (!this.climbed) {
      this.addKeyword(['CLIMB_THE_FENCE', 'CLIMB'], `Climb over the jail fence`, () => {
        this.climbed = true;
        return new KeywordResponse({
          text: snl`CLIMB! Oh no! The top of the fence is still too high up to climb over.`,
        });
      });
    }
    if (this.jumped && this.climbed) {
      this.addKeyword(
        ['RUN_JUMP_AND_CLIMB_THE_FENCE', 'JUMP_CLIMB'],
        `Jump and then climb over the jail fence`,
        // BUG: there will still be location keywords of escape jail shown in the welcome intro to the new game
        () =>
          game.branchToGame(
            BubbleGunWorldGame,
            parajoin([
              snl`RUN RUN RUN JUUUUMP! Climb, climb, climb! You made it!`,
              snl`You run and run and run for a long time. You find yourself in
              a strange new place. It looks very exciting and new!`,
            ]),
          ),
      );

      const { keyword, description, fn } = delayAndDie();
      this.addKeyword(keyword, description, fn);
    }
  }
}
