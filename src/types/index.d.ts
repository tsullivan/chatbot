import { ChatGame } from '../games';
import { Session } from '../bot';

export interface GameSet {
  [gameName: string]: new (session: Session) => ChatGame;
}
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

export type UserFormat = 'user' | 'hup' | 'syn';

export interface ChatBody {
  message: string;
  format: UserFormat;
  time: Date;
}

export interface ChatResponse {
  name?: string;
  format: ResponseFormat;
  message: string;
}
