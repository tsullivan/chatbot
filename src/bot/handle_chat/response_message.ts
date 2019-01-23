import * as apm from 'elastic-apm-node';
import { IChatResponse } from '../../types';
import { ChatSession } from '../chat_session';

export class ResponseMessage {
  protected userMessage: string;
  protected userFormat: string;
  protected response: IChatResponse;
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

  public async makeResponse(chat): Promise<IChatResponse> {
    // override this
    return {
      format: null,
      message: null,
    };
  }

  public getName() {
    return this.name;
  }

  public getPlain(message): IChatResponse {
    return {
      format: 'plain',
      message,
    };
  }

  public getMarkdown(message): IChatResponse {
    return {
      format: 'markdown',
      message,
    };
  }

  public respond(message, format = 'markdown'): IChatResponse {
    this.response = format === 'plain' ? this.getPlain(message) : this.getMarkdown(message);
    return this.response;
  }

  public async getResponse(): Promise<IChatResponse> {
    if (this.span) {
      this.span.end();
    }
    this.response = await this.makeResponse(this.chat);
    return this.response;
  }
}
