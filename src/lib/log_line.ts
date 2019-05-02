// make tags unique
const uniq = (tags: string[]): string[] =>
  tags.reduce((items, item): string[] => {
    if (items.includes(item)) {
      return items;
    }
    return [...items, item];
  }, []);

export class LogEvent {
  public readonly timestamp: Date;
  public message: string;
  public tags: string[];
  private logger: any;

  public constructor(tags: string[], logger: any) {
    this.timestamp = new Date();
    this.tags = tags;
    this.logger = logger;
  }

  public logString(message: string): this {
    this.message = message;
    this.logger('%o', {
      message: this.message,
      tags: uniq(this.tags),
      timestamp: this.timestamp,
    });

    return this;
  }

  public logObject(obj: any): this {
    this.message = '[Object object]';
    this.logger('%O', {
      obj,
      tags: uniq(this.tags),
      timestamp: this.timestamp,
    });

    return this;
  }
}
