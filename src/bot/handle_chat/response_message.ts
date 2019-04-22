import * as apm from 'elastic-apm-node';
import { ChatResponse } from '../../types';
import { ChatSession } from '../chat_session';

export class ResponseMessage {
  protected userMessage: string;
  protected userFormat: string;
  protected response: ChatResponse;
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

  public async makeResponse(chat): Promise<ChatResponse> {
    // override this
    return {
      format: null,
      message: null,
    };
  }

  public getName() {
    return this.name;
  }

  public getPlain(message): ChatResponse {
    return {
      format: 'plain',
      message,
    };
  }

  public getMarkdown(message): ChatResponse {
    return {
      format: 'markdown',
      message,
    };
  }

  public respond(message, format = 'markdown'): ChatResponse {
    this.response = format === 'plain' ? this.getPlain(message) : this.getMarkdown(message);
    return this.response;
  }

  public async getResponse(): Promise<ChatResponse> {
    if (this.span) {
      this.span.end();
    }
    this.response = await this.makeResponse(this.chat);
    return this.response;
  }
}
