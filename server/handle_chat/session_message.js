const { ChatResponder } = require('./chat_responder');

class SessionMessage extends ChatResponder {
  constructor(session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.makeResponse(session);
  }

  makeResponse(session) {
    session.fulfillWait(this.originalText);
    const nextBotMessage = session.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.setPlain(nextBotMessage);
    }

    if (session.game !== null) {
      const { isDone, response } = session.game.testInput(this.originalText);
      if (isDone) {
        session.endGame();
      }
      return this.setPlain(response);
    }
  }

  getResponse() {
    return this.response;
  }
}

module.exports = { SessionMessage };
