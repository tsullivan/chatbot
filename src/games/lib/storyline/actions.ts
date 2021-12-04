import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Enemy } from './enemy';
import { GameState, StoryResponse } from './';
import { KeywordResponse } from '../';

export const cleanup = (state: GameState): GameState => {
  return { ...state, response: undefined, responses: [] };
};

export const getQuit = (state: GameState): KeywordResponse =>
  new KeywordResponse({
    format: 'markdown',
    text: `You quit! GAME OVER. Here's your score ${state.score}`,
    isDone: true,
  });

const runBattle$ = (game$: Rx.Observable<GameState>, input: string) =>
  game$.pipe(
    map((state) => {
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
      return { ...state, responses };
    })
  );

const runThwip$ = (game$: Rx.Observable<GameState>, input: string) =>
  game$.pipe(
    filter(() => input.toUpperCase() === 'THWIP'),
    map((state) => {
      return {
        ...state,
        responses: [
          `Spidey is out of web fluid! Nothing happens! How embarassing!`,
        ].concat(state.responses),
      };
    })
  );

const runLaser$ = (game$: Rx.Observable<GameState>, input: string) =>
  game$.pipe(
    filter(() => input.toUpperCase() === 'LASER_BLAST'),
    map((state) => {
      return {
        ...state,
        responses: [`Tony's laser blast misses terribly! Battery at 1%!`].concat(
          state.responses
        ),
      };
    })
  );

export const gameQuit = (state$: Rx.Observable<GameState>, input: string) =>
  state$.pipe(
    map(({ isDone, ...state }) => ({
      ...state,
      isDone: input.toUpperCase() === 'QUIT' ? true : isDone,
    })),
    filter((state) => state.isDone === true),
    map((state) => ({
      ...state,
      response: getQuit(state),
    }))
  );

export const gamePlay = (
  state$: Rx.Observable<GameState>,
  input: string,
  cb: (gs: GameState) => StoryResponse
) => {
  const new$ = state$.pipe(map(cleanup));

  const next = (state: GameState) => {
    const { responses } = state;
    const nextResp = cb(state);
    responses.push(nextResp.text);

    if (nextResp.challenge) {
      state.enemy = state.enemy || new Enemy(nextResp.challenge);
      const challenge = state.enemy.getChallenge();
      responses.push(`> ${challenge.question}\n\n`);
    }

    return {
      ...state,
      responses,
    };
  };

  return Rx.merge(
    runBattle$(new$, input).pipe(map(next)),
    runThwip$(new$, input).pipe(map(next)),
    runLaser$(new$, input).pipe(map(next))
  ).pipe(
    map((state) => {
      const { responses } = state;
      const pre = `**Iron Man And Spidey Game!**\n\nTurns: ${state.turns}. Level: ${state.level}. Score: ${state.score}`;
      const text = [pre, ...responses].join('\n\n');

      return {
        ...state,
        response: new KeywordResponse({
          format: 'markdown',
          text,
        }),
      };
    })
  );
};
