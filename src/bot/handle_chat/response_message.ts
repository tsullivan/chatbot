import * as apm from 'elastic-apm-node';
import { ChatResponse, UserFormat } from '../../types';
import { Session } from '../session';

export class ResponseMessage {
  protected userMessage: string;
  protected userFormat: UserFormat;
  protected response: ChatResponse;
  private span: any;
  private name: string;
  private chat: Session;

  public constructor(name: string, chat: Session, userMessage: string, userFormat: UserFormat) {
    this.span = apm.startSpan(`${name}Span`);
    this.name = name;
    this.chat = chat;
    this.userMessage = userMessage;
    this.userFormat = userFormat;
  }

  public async makeResponse(chat: Session): Promise<ChatResponse> {
    // override this
    return {
      format: null,
      message: null,
    };
  }

  public getName() {
    return this.name;
  }

  public getPlain(message: string): ChatResponse {
    return {
      format: 'plain',
      message,
    };
  }

  public getMarkdown(message: string): ChatResponse {
    return {
      format: 'markdown',
      message,
    };
  }

  public respond(message: string, format = 'markdown'): ChatResponse {
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
