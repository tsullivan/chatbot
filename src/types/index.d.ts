import * as express from 'express-session';
import { ChatGame } from '../server/games';

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
  info: (tags: string[], message: string) => void;
  debug: (tags: string[], message: string) => void;
  warn: (tags: string[], message: string) => void;
  error: (tags: string[], err: Error) => void;
  fatal: (tags: string[], message: string, err: Error) => void;
}

export interface IBot {
  getMetrics: (req: express.Request) => IMetrics;
  getLogger: () => ILog;
}
