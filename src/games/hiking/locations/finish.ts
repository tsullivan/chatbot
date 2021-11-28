import { s, p } from '../../../lib';
import { Adventure, KeywordResponse, Location } from '../../lib';
import { SOUTH } from '../constants';

export class FinishLocation extends Location {
  public constructor(game: Adventure) {
    super({ game, name: 'Finish Line' });
  }

  public getDescription(_game: Adventure) {
    const lns = [
      s`The finish line looks like a robot. You can ask the robot to take out
        a flag, and that will finish this hiking game.`,
      s`Ready to end the hiking journey?`,
    ];
    return p(lns);
  }

  public setLocationKeywords(_game: Adventure) {
    this.addKeyword(
      ['ASK_THE_ROBOT_TO_TAKE_OUT_A_FLAG', 'ROBOT', 'FLAG', 'FINISH'],
      `Leave the hiking journey and save your points`,
      () => {
        return new KeywordResponse({
          isDone: true,
          text: s`The robot takes out a flag, and swishes it over your head.
            This takes you to the end of the hiking journey.`,
        });
      },
    );
    this.addKeyword(
      'BRIDGE',
      `Go back to the bridge, and keep playing the hiking game`,
      () => this.followExit(SOUTH),
    );
  }
}
