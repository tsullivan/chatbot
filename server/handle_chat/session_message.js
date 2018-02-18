const { ResponseMessage } = require('./response_message');

class SessionMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super(message, format);

    if (format === 'syn') {
      chat.setWaitOnName();
      this.response = this.plain('Hello! What is your name?');
    } else {
      this.response = this.makeResponse(chat);
    }
  }

  makeResponse(chat) {
    chat.fulfillWait(this.originalText);
    const nextBotMessage = chat.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.plain(nextBotMessage);
    }

    if (chat.game !== null) {
      const { isDone, response } = chat.game.testInput(this.originalText);
      chat.game.save();
      if (isDone) {
        chat.endGame();
      }
      return this.plain(response);
    }

    return null;
  }
}

module.exports = { SessionMessage };
