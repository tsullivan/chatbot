import * as Rx from 'rxjs';
import { filter, map, merge } from 'rxjs/operators';
import { Enemy } from './enemy';
import { GameState } from './types';
import { KeywordResponse } from '../../lib';
import { getStoryResponseFromTurn } from './story';

export const cleanup = (state: GameState): GameState => {
  return {
    ...state,
    response: undefined,
    responses: [],
  };
};

const runBattle$ = (game$: Rx.Observable<GameState>, input: string) => {
  return game$.pipe(
    map(state => {
      const { enemy, responses } = state;

      if (enemy) {
        const { answer } = enemy.getChallenge();
        if (input === answer) {
          state.turns += 1; // progress via correct answer
          state.score += 1;
          state.enemy = undefined;
          responses.push(`***Correct! MOVE FORWARD***\n\n`);
        } else {
          responses.push(`***Wrong! TRY AGAIN***\n\n`);
        }
      } else {
        state.turns += 1; // progress via default
      }

      if (state.turns > 10) {
        state.turns = 1; // reset
        state.level += 1;
        responses.push(`***Great work! Go up a level!***\n\n`);
      }

      return {
        ...state,
        responses,
      };
    })
  );
};

const runThwip$ = (game$: Rx.Observable<GameState>, input: string) => {
  return game$.pipe(
    filter(() => input.toUpperCase() === 'THWIP'),
    map(state => {
      return {
        ...state,
        responses: [
          `Spidey is out of web fluid! Nothing happens! How embarassing!`,
        ].concat(state.responses),
      };
    })
  );
};

const runLaser$ = (game$: Rx.Observable<GameState>, input: string) => {
  return game$.pipe(
    filter(() => input.toUpperCase() === 'LASER_BLAST'),
    map(state => {
      return {
        ...state,
        responses: [`Tony's laser blast misses terribly! Battery at 1%!`].concat(
          state.responses
        ),
      };
    })
  );
};

const runQuit$ = (
  state$: Rx.Observable<GameState>,
  input: string
): Rx.Observable<GameState> => {
  return state$.pipe(
    map(({ isDone, ...state }) => ({
      ...state,
      isDone: input.toUpperCase() === 'QUIT' ? true : isDone,
    })),
    filter(s => s.isDone === true),
    map(state => ({
      ...state,
      response: new KeywordResponse({
        format: 'markdown',
        text: `You quit! GAME OVER. Here's your score ${state.score}`,
        isDone: true,
      }),
    }))
  );
};

const getNext = (input: string) => {
  return (state: GameState) => {
    const { responses } = state;
    const next = getStoryResponseFromTurn(state);
    responses.push(next.text);

    if (next.challenge) {
      state.enemy = state.enemy || new Enemy();
      const challenge = state.enemy.getChallenge();
      responses.push(`> ${challenge.question}\n\n`);
    }

    return {
      ...state,
      responses,
    };
  };
};

export const getGameIteration$ = (state$: Rx.Observable<GameState>, input: string) => {
  const new$ = state$.pipe(map(cleanup));

  return Rx.merge(
    runBattle$(new$, input).pipe(map(getNext(input))),
    runThwip$(new$, input).pipe(map(getNext(input))),
    runLaser$(new$, input).pipe(map(getNext(input))),
  ).pipe(
    map(state => {
      const { responses } = state;
      const pre = `**Iron Man And Spidey Game!**\
        
Turns: ${state.turns}. Level: ${state.level}. Score: ${state.score}`;
      const text = [pre, ...responses].join('\n\n');

      return {
        ...state,
        response: new KeywordResponse({
          format: 'markdown',
          text,
        }),
      };
    }),
    merge(runQuit$(state$, input))
  );
};
