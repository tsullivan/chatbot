import * as Rx from 'rxjs';
import { ChatGame, KeywordResponse } from '../../lib';
import { map, tap } from 'rxjs/operators';
import { GameState } from './types';
import { Session } from '../../../bot';
import { getGameIteration$ } from './actions';

export const getDefaultState = (): GameState => ({
  level: 1,
  turns: 0, // turns needs to reset when level increments
  score: 0,
  responses: [],
  isDone: false,
});


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
    const state$: Rx.Observable<GameState> = Rx.of({ ...this.state });

    return getGameIteration$(state$, input)
      .pipe(
        tap(({ response, ...state }) => {
          this.state = state;
        }),
        map(({ response }) => response),
      )
      .toPromise();
  }

  public getWelcome() {
    return `Get Ready!`;
  }
}
