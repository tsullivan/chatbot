import { ILogLine } from '../types';

export class LogLine implements ILogLine {
  public readonly timestamp: Date;

  constructor(public tags: string[], public message: string, logger) {
    this.timestamp = new Date();
    logger('%o', {
      message: this.message,
      tags: this.tags,
      timestamp: this.timestamp,
    });
  }

  get log() {
    return {
      message: this.message,
      tags: this.tags,
      timestamp: this.timestamp,
    };
  }
}
