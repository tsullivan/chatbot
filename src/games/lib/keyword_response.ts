export interface KeywordResponseValue {
  changeScore?: number;
  format?: string;
  isCascade: boolean;
  isDone: boolean;
  showInstructions: boolean;
  response: string;
}

export class KeywordResponse {
  public static getResponseFromHandler(handler, game) {
    const handlerResponse: KeywordResponse = handler(game); // what if this updates an item on the floor?
    if (handlerResponse instanceof KeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  private changeScore: number;
  private format: string;
  private isCascade: boolean;
  private isDone: boolean;
  private response: string;
  private showInstructions: boolean;

  constructor({
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

  public getFields(): KeywordResponseValue {
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
