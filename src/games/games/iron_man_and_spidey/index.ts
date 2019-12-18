import * as Rx from 'rxjs';
import { ChatGame, KeywordResponse } from '../../lib';
import {
  addEnemies,
  characterAttack,
  cleanup,
  enemyAttack,
  getDefaultState,
  storyProgress,
} from './actions';
import { filter, map, merge, tap } from 'rxjs/operators';
import { getKeywordResponse, getQuitResponse } from './responses';
import { GameState } from './types';
import { Session } from '../../../bot';

const getGameRun$ = (state$: Rx.Observable<GameState>, input: string) => {
  return state$.pipe(
    map(cleanup),
    map(state => characterAttack(state, input)), // handle user input
    map(storyProgress),
    map(addEnemies),
    map(enemyAttack),
    map(state => ({
      ...state,
      response: getKeywordResponse(state),
    }))
  );
};

const getGameQuit$ = (state$: Rx.Observable<GameState>, input: string) => {
  return state$.pipe(
    map(({ isDone, ...state }) => ({
      ...state,
      isDone: input === 'QUIT' ? true : isDone,
    })),
    filter(s => s.isDone === true),
    map(state => ({
      state,
      response: getQuitResponse(state),
    }))
  );
};

export default class IronManAndSpideyGame extends ChatGame {
  private state: GameState;
  public constructor(session: Session) {
    super(session);
    this.setName('ironman_and_spidey');
  }
  public init() {
    this.state = getDefaultState();
  }

  public testInput(input: string): Promise<KeywordResponse> {
    const state$ = Rx.of({ ...this.state });

    return getGameRun$(state$, input)
      .pipe(
        tap(state => {
          this.state = { ...state };
        }),
        merge(getGameQuit$(state$, input)),
        map(({ response }): KeywordResponse => response)
      )
      .toPromise();
  }

  public getWelcome() {
    return `Get Ready!`;
  }
}
