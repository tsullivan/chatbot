class LocationKeywordResponse {
  constructor({ text = 'Not sure', changeScore = 0, isDone = false }) {
    this.text = text;
    this.changeScore = changeScore;
    this.isDone = isDone;
  }

  static getResponseFromHandler(handler, game) {
    const handlerResponse = handler(game);
    if (handlerResponse instanceof LocationKeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  setText(text) {
    this.text = text;
  }

  get() {
    const { text, changeScore, isDone } = this;
    return {
      response: text,
      changeScore,
      isDone
    };
  }
}

module.exports = { LocationKeywordResponse };
