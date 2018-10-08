export interface IKeywordResponseValue {
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

  private text;
  private format;
  private changeScore;
  private isDone;
  private showInstructions;
  private isCascade;

  constructor({
    text = 'Not sure',
    format = 'markdown',
    changeScore = 0,
    isDone = false,
    showInstructions = true,
    isCascade = false,
  }) {
    this.text = text;
    this.format = format;
    this.changeScore = changeScore;
    this.isDone = isDone;
    this.showInstructions = showInstructions;
    this.isCascade = isCascade;
  }

  public get(): IKeywordResponseValue {
    const { changeScore, format, isCascade, isDone, showInstructions, text } = this;
    return {
      changeScore,
      format,
      isCascade,
      isDone,
      response: text,
      showInstructions,
    };
  }
}
