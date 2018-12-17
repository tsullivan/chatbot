import { ILogLine } from '../types';

export class LogLine implements ILogLine {
  public readonly timestamp: Date;
  public message: string;

  constructor(public tags: string[], private logger: any) {
    this.timestamp = new Date();
  }

  public logString(message: string): ILogLine {
    this.message = message;
    this.logger('%o', {
      message: this.message,
      tags: this.tags,
      timestamp: this.timestamp,
    });

    return this;
  }

  public logObject(obj: any): ILogLine {
    this.message = '[Object object]';
    this.logger('%O', {
      obj,
      tags: this.tags,
      timestamp: this.timestamp,
    });

    return this;
  }
}
