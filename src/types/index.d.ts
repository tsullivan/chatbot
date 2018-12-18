import * as express from 'express-session';
import { ChatGame } from '../games';

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

export interface IBot {
  getLogger: (tag?: string[]) => ILog;
  getMetrics: (req: express.Request) => IMetrics;
  getSessionGame: (sessionId: string) => ChatGame;
  setGame: (sessionId: string, game: ChatGame) => void;
  removeGame: (sessionId: string) => void;
}
