import debug from 'debug';
import { ILog, ILogLine } from '../types';
import { LogLine } from './log_line';

const infoLogger = debug('chatbot:info');
const debugLogger = debug('chatbot:debug');
const warnLogger = debug('chatbot:warn');
const errorLogger = debug('chatbot:error');

export class Log implements ILog {
  private tags = [];

  public addTags(tags: string[]) {
    this.tags = [].concat(this.tags, tags);
  }

  public info(tags: string[], message: string): ILogLine {
    return (new LogLine([...tags, ...this.tags], infoLogger)).logString(message);
  }

  public debug(tags: string[], message: string): ILogLine {
    return (new LogLine([...tags, ...this.tags], debugLogger)).logString(message);
  }

  public json(tags: string[], obj: any): ILogLine {
    return (new LogLine([...tags, ...this.tags], debugLogger)).logObject(obj);
  }

  public warn(tags: string[], message: string): ILogLine {
    return (new LogLine([...tags, ...this.tags], warnLogger)).logString(message);
  }

  public error(tags: string[], err: Error): ILogLine {
    return (new LogLine([...tags, ...this.tags], errorLogger)).logObject(err);
  }
}
