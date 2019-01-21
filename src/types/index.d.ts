import { ChatGame } from '../games';
import { ChatSession } from '../bot';

export type TSessionGames = Map<string, ChatGame>;

export interface IMetrics {
  session_expires_in_sec: number;
  games: {
    total: number;
  },
  users: {
    names: string[];
  }
}

export interface ILogLine {
  timestamp: Date;
  message: string;
  tags: string[];
}

export interface ILog {
  info: (tags: string[], message: string) => ILogLine;
  debug: (tags: string[], message: string) => ILogLine;
  json: (tags: string[], obj: any) => ILogLine;
  warn: (tags: string[], message: string) => ILogLine;
  error: (tags: string[], err: Error) => ILogLine;
}

export interface IChatBody {
  message: string;
  format: string;
  time: Date;
}

export interface IChatResponse {
  message: string;
}
