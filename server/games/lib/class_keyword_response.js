class KeywordResponse {
  constructor({
    text = 'Not sure',
    changeScore = 0,
    isDone = false,
    showInstructions = true,
    isCascade = false,
  }) {
    this.text = text;
    this.changeScore = changeScore;
    this.isDone = isDone;
    this.showInstructions = showInstructions;
    this.isCascade = isCascade;
  }

  static getResponseFromHandler(handler, game) {
    const handlerResponse = handler(game);
    if (handlerResponse instanceof KeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  setText(text) {
    this.text = text;
  }

  get() {
    const { text, changeScore, isDone, showInstructions, isCascade } = this;
    return {
      response: text,
      changeScore,
      isDone,
      showInstructions,
      isCascade,
    };
  }
}

module.exports = { KeywordResponse };
