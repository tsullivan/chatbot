import { ChatGame } from '../games';

export type SessionGames = Map<string, ChatGame>;

export interface MetricStats {
  session_expires_in_sec: number;
  games: {
    total: number;
  };
  users: {
    names: string[];
  }
}

export interface ChatBody {
  message: string;
  format: string;
  time: Date;
}

export interface ChatResponse {
  name?: string;
  format: string;
  message: string;
}
