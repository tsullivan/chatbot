import { Enemy } from './enemy';
import { KeywordResponse } from '../../lib';

export interface GameState {
  level: number;
  turns: number;
  score: number;
  enemy?: Enemy;
  responses: string[];
  response?: KeywordResponse;
  isDone: boolean;
}
