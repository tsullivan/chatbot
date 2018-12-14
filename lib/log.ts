import debug from 'debug';
import { ILog, ILogLine } from '../types';
import { LogLine } from './log_line';

const infoLogger = debug('chatbot:info');
const debugLogger = debug('chatbot:debug');
const warnLogger = debug('chatbot:warn');
const errorLogger = debug('chatbot:error');
const fatalLogger = debug('chatbot:fatal');

export class Log implements ILog {
  public info(tags: string[], message: string): ILogLine {
    return new LogLine(['info', ...tags], message, infoLogger).log;
  }

  public debug(tags: string[], message: string): ILogLine {
    return new LogLine(['debug', ...tags], message, debugLogger).log;
  }

  public warn(tags: string[], message: string): ILogLine {
    return new LogLine(['debug', ...tags], message, warnLogger).log;
  }

  public error(tags: string[], err: Error): ILogLine {
    errorLogger('%O', err);
    const message = err.message;
    return new LogLine(['debug', ...tags], message, errorLogger).log;
  }

  public fatal(tags: string[], message: string, err: Error): ILogLine {
    fatalLogger('%O', err);
    return new LogLine(['debug', ...tags], message, fatalLogger).log;
  }
}
