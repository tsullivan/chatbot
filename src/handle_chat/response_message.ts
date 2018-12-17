import * as apm from 'elastic-apm-node';

export interface IResponse {
  format: string;
  message: string;
}

export class ResponseMessage {
  protected userMessage: string;
  protected userFormat: string;
  protected response: IResponse;
  private span: any;
  private name: string;

  constructor(name, chat, userMessage, userFormat) {
    this.span = apm.startSpan(`${name}Span`);
    this.name = name;
    this.userMessage = userMessage;
    this.userFormat = userFormat;
    this.response = this.makeResponse(chat);
  }

  public makeResponse(chat): IResponse {
    // override this
    return {
      format: null,
      message: null,
    };
  }

  public getName() {
    return this.name;
  }

  public getPlain(message): IResponse {
    return {
      format: 'plain',
      message,
    };
  }

  public getMarkdown(message): IResponse {
    return {
      format: 'markdown',
      message,
    };
  }

  public respond(message, format = 'markdown'): IResponse {
    this.response = format === 'plain' ? this.getPlain(message) : this.getMarkdown(message);
    return this.response;
  }

  public getResponse(): IResponse {
    this.span.end();
    return this.response;
  }
}
