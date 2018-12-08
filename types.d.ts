import * as express from 'express-session';

export type TSessionGames = Map<string, string>;

export interface IMetrics {
  session_expires_in_sec: number;
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
  fatal: (tags: string[], message: string) => void;
}

export interface IBot {
  getMetrics: (req: express.Request) => IMetrics;
  getLogger: () => ILog;
}
