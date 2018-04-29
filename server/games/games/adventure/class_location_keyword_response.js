class LocationKeywordResponse {
  constructor({ text = 'Not sure', reduceScore = 0, isDone = false }) {
    this.text = text;
    this.reduceScore = reduceScore;
    this.isDone = isDone;
  }

  static getResponseFromHandler(handler) {
    const handlerResponse = handler();
    if (handlerResponse instanceof LocationKeywordResponse) {
      return handlerResponse;
    } else {
      throw new Error('Bad response: ' + JSON.stringify(handlerResponse));
    }
  }

  setText(text) {
    this.text = text;
  }

  reduceScoreBy(amount) {
    this.reduceScoreBy -= amount;
  }

  get() {
    const { text, reduceScore, isDone } = this;
    return {
      response: text,
      reduceScore,
      isDone
    };
  }
}

module.exports = { LocationKeywordResponse };
