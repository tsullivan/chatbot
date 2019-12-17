import { Enemy } from './enemy';
import { KeywordResponse } from '../../lib';

export interface GameState {
  turns: number;
  score: number;
  enemies: Enemy[];
  responses: string[];
  response?: KeywordResponse;
  isDone: boolean;
}
