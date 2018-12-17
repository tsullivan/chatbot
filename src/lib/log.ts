import debug from 'debug';
import { ILog, ILogLine } from '../types';
import { LogLine } from './log_line';

const infoLogger = debug('chatbot:info');
const debugLogger = debug('chatbot:debug');
const warnLogger = debug('chatbot:warn');
const errorLogger = debug('chatbot:error');

export class Log implements ILog {
  public info(tags: string[], message: string): ILogLine {
    return (new LogLine(['info', ...tags], infoLogger)).logString(message);
  }

  public debug(tags: string[], message: string): ILogLine {
    return (new LogLine(['debug', ...tags], debugLogger)).logString(message);
  }

  public json(tags: string[], obj: any): ILogLine {
    return (new LogLine(['debug', 'json', ...tags], debugLogger)).logObject(obj);
  }

  public warn(tags: string[], message: string): ILogLine {
    return (new LogLine(['warn', ...tags], warnLogger)).logString(message);
  }

  public error(tags: string[], err: Error): ILogLine {
    return (new LogLine(['error', ...tags], errorLogger)).logObject(err);
  }
}
