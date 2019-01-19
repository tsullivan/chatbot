import * as apm from 'elastic-apm-node';
import { ChatSession } from '../../web/session';

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
  private chat: ChatSession;

  constructor(name, chat, userMessage, userFormat) {
    this.span = apm.startSpan(`${name}Span`);
    this.name = name;
    this.chat = chat;
    this.userMessage = userMessage;
    this.userFormat = userFormat;
  }

  public makeResponse(chat): Promise<IResponse> {
    // override this
    return Promise.resolve({
      format: null,
      message: null,
    });
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

  public async getResponse(): Promise<IResponse> {
    if (this.span) {
      this.span.end();
    }

    return this.makeResponse(this.chat)
    .then((response:IResponse) => {
      this.response = response;
      return this.response;
    });
  }
}
