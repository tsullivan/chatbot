import { GameState } from './types';
import { KeywordResponse } from '../../lib';

export const getDefaultResponse = (state: GameState) => {
  const { isDone, responses } = state;

  const pre = `**Iron Man And Spidey Game!**\n\nTurns: ${state.turns} Score: ${state.score}`;
  const text = [pre].concat(responses).join('\n\n');

  return new KeywordResponse({
    format: 'markdown',
    text,
    isDone,
  });
};

export const getKeywordResponse = (endState: GameState) => {
  return getDefaultResponse(endState);
};

export const getQuitResponse = (endState: GameState) => {
  return new KeywordResponse({
    format: 'markdown',
    text: `You quit! GAME OVER. Here's your score ${endState.score}`,
    isDone: true,
  });
};
