const { ChatResponder } = require('./chat_responder');

class SessionMessage extends ChatResponder {
  constructor(session, messageText, messageFormat) {
    super(messageText, messageFormat);
    this.response = this.makeResponse(session);
  }

  makeResponse(session) {
    session.fulfillWait(this.originalText);
    const nextBotMessage = session.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.plain(nextBotMessage);
    }

    if (session.game !== null) {
      const { isDone, response } = session.game.testInput(this.originalText);
      session.game.save();
      if (isDone) {
        session.endGame();
      }
      return this.plain(response);
    }

    return null;
  }
}

module.exports = { SessionMessage };
