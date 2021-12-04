import * as Rx from 'rxjs';
import { map, mergeWith, tap } from 'rxjs/operators';
import { KeywordResponse } from '../';
import { gamePlay, gameQuit } from './actions';
import { Enemy } from './enemy';

export interface GameState {
  level: number;
  turns: number;
  score: number;
  enemy?: Enemy;
  responses: string[];
  response?: KeywordResponse;
  isDone: boolean;
}

export type ChallengeCode = 'sums';

export interface StoryResponse {
  text: string;
  challenge?: ChallengeCode;
}

export class StoryLiner {
  private state = getDefaultState();
  constructor(private cb: (gs: GameState) => StoryResponse) {}

  public testInput(input: string) {
    const state$: Rx.Observable<GameState> = Rx.of({ ...this.state });

    return Rx.firstValueFrom(
      gamePlay(state$, input, this.cb).pipe(
        mergeWith(gameQuit(state$, input)),
        tap(({ response, ...state }) => {
          this.state = state;
        }),
        map(({ response }) => response)
      )
    );
  }

  static feedMe(story: SuperStory, state: GameState): StoryResponse {
    const { level, turns } = state;
    const realTurns = turns - 1; // turns started on 1
    const realLevel = level - 1; // level started on 1

    if (story[realLevel]) {
      const runTurns = Math.min(realTurns, story[realLevel].length - 1);
      if (story[realLevel][runTurns]) {
        return story[realLevel][runTurns]();
      }
    }

    return { text: `That's it. You won!` };
  }
}

type SuperStory = (() => { text: string })[][];

const getDefaultState = (): GameState => ({
  level: 1,
  turns: 0, // turns needs to reset when level increments
  score: 0,
  responses: [],
  isDone: false,
});

