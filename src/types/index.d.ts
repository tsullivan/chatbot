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

export type ResponseFormat = 'markdown' | 'plain';

export type UserFormat = 'plain' | 'hup' | 'syn';

export interface ChatBody {
  message: string;
  format: ResponseFormat;
  time: Date;
}

export interface ChatResponse {
  name?: string;
  format: ResponseFormat;
  message: string;
}
