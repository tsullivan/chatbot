import { ChatGame } from '../lib/chat_game';

export class KeywordResponse {
  public static getResponseFromHandler(handler: any, game: ChatGame) {
    const handlerResponse: KeywordResponse = handler(game); // what if this updates an item on the floor?
    if (handlerResponse instanceof KeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  public changeScore?: number;
  public format: string;
  public isCascade?: boolean;
  public isDone: boolean;
  public response: string;
  public showInstructions?: boolean;

  public constructor({
    text = 'Not sure',
    format = 'markdown',
    changeScore = 0,
    isDone = false,
    showInstructions = true,
    isCascade = false,
  }) {
    this.changeScore = changeScore;
    this.format = format;
    this.isCascade = isCascade;
    this.isDone = isDone;
    this.response = text;
    this.showInstructions = showInstructions;
  }

  public getFields(): Partial<KeywordResponse> {
    return {
      changeScore: this.changeScore,
      format: this.format,
      isCascade: this.isCascade,
      isDone: this.isDone,
      response: this.response,
      showInstructions: this.showInstructions,
    };
  }
}
