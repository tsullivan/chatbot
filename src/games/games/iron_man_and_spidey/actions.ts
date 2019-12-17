import { Enemy } from './enemy';
import { GameState } from './types';

export const getDefaultState = (): GameState => ({
  turns: 0,
  score: 0,
  enemies: [],
  responses: [],
  isDone: false,
});

export const cleanup = (state: GameState): GameState => {
  return {
    ...state,
    response: undefined,
    responses: [],
  };
};

export const characterAttack = (state: GameState, input: string): GameState => {
  let { responses, enemies } = state;

  if (enemies.length > 0) {
    const enemy = enemies[enemies.length - 1];
    const { answer } = enemy.getChallenge();
    if (input === answer) {
      responses.push(`***Correct!***\n\n`);
      enemies.pop();
      state.score += 1;
    } else {
      responses.push(`***Wrong!***\n\n`);
    }
  }

  return {
    ...state,
    enemies,
    responses,
  };
};

export const storyProgress = (state: GameState): GameState => {
  let { turns } = state;
  turns += 1;
  return {
    ...state,
    turns,
  };
};

export const addEnemies = ({ enemies, ...state }: GameState): GameState => {
  // function for adding more powerful enemies as level goes up
  if (enemies.length === 0) {
    enemies.push(new Enemy());
  }
  return {
    ...state,
    enemies,
  };
};

export const enemyAttack = (state: GameState): GameState => {
  const { responses, enemies } = state;

  // roll bad guy attack
  for (let i = 0; i < enemies.length; i++) {
    const enem = enemies[i];
    const challenge = enem.getChallenge();
    // add to output
    responses.push(`> ${challenge.question}\n\n`);
  }

  return {
    ...state,
    responses,
  };
};
