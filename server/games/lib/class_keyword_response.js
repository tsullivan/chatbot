class KeywordResponse {
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

  static getResponseFromHandler(handler, game) {
    const handlerResponse = handler(game); // what if this updates an item on the floor?
    if (handlerResponse instanceof KeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  get() {
    const { text, format, changeScore, isDone, showInstructions, isCascade } = this;
    return {
      response: text,
      format,
      changeScore,
      isDone,
      showInstructions,
      isCascade,
    };
  }
}

module.exports = { KeywordResponse };
