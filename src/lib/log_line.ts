import { ILogLine } from '../types';

// make tags unique
const uniq = tags =>
  tags.reduce((items, item) => {
    if (items.includes(item)) {
      return items;
    }
    return [...items, item];
  }, []);

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
      tags: uniq(this.tags),
      timestamp: this.timestamp,
    });

    return this;
  }

  public logObject(obj: any): ILogLine {
    this.message = '[Object object]';
    this.logger('%O', {
      obj,
      tags: uniq(this.tags),
      timestamp: this.timestamp,
    });

    return this;
  }
}
