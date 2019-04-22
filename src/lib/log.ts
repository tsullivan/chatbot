import debug from 'debug';
import { LogEvent } from './log_line';

const infoLogger = debug('chatbot:info');
const debugLogger = debug('chatbot:debug');
const warnLogger = debug('chatbot:warn');
const errorLogger = debug('chatbot:error');

export class Log {
  private tags = [];

  public addTags(tags: string[]): void {
    this.tags = [].concat(this.tags, tags);
  }

  public info(tags: string[], message: string): LogEvent {
    return new LogEvent([...tags, ...this.tags], infoLogger).logString(message);
  }

  public debug(tags: string[], message: string): LogEvent {
    return new LogEvent([...tags, ...this.tags], debugLogger).logString(message);
  }

  public json(tags: string[], obj: any): LogEvent {
    return new LogEvent([...tags, ...this.tags], debugLogger).logObject(obj);
  }

  public warn(tags: string[], message: string): LogEvent {
    return new LogEvent([...tags, ...this.tags], warnLogger).logString(message);
  }

  public error(tags: string[], err: Error): LogEvent {
    return new LogEvent([...tags, ...this.tags], errorLogger).logObject(err);
  }
}
