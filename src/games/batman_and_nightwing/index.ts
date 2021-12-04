import { ChatGame } from '../lib';
import { Session } from '../../bot';
import { GameState, StoryLiner, StoryResponse } from '../lib/storyline';

const getStoryResponseFromTurn = (state: GameState) => {
  const story: (() => StoryResponse)[][] = [
    [
      () => ({
        text: `testing testing`,
        challenge: 'multiplications',
      }),
    ],
    [
      () => ({
        text: `testing 123`,
        challenge: 'sums',
      }),
    ],
  ];

  return StoryLiner.feedMe(story, state);
};

export default class BatmanAndNightwingGame extends ChatGame {
  private t = new StoryLiner(getStoryResponseFromTurn);

  public constructor(session: Session) {
    super(session);
    this.setName('batman_and_nightwing');
  }

  public async testInput(input: string) {
    return await this.t.testInput(input);
  }

  public getWelcome() {
    return `Get Ready!`;
  }
}
