import { ILog, ILogLine } from '../types';
import { LogLine } from './log_line';

export class Log implements ILog {
  public info(tags: string[], message: string): ILogLine {
    return new LogLine(['info', ...tags], message).log;
  }

  public debug(tags: string[], message: string): ILogLine {
    return new LogLine(['debug', ...tags], message).log;
  }

  public warn(tags: string[], message: string): ILogLine {
    return new LogLine(['debug', ...tags], message).log;
  }

  public error(tags: string[], err: Error): ILogLine {
    const message = err.message;
    return new LogLine(['debug', ...tags], message).log;
  }

  public fatal(tags: string[], message: string): ILogLine {
    return new LogLine(['debug', ...tags], message).log;
  }
}
