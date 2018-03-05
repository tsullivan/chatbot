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
    const { isValid, revalidateResponse } = chat.validateSession();
    if (isValid) {
      chat.fulfillWait(this.userMessage);
    } else {
      return this.plain(revalidateResponse);
    }

    const nextBotMessage = chat.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.plain(nextBotMessage);
    }

    if (chat.game !== null) {
      const { isDone, response } = chat.game.testInput(this.userMessage);
      let modResponse = response;
      chat.game.save();
      if (isDone === true) {
        modResponse += `\nThat was fun, ${chat.getName()}!`;
        chat.endGame();
      }
      return this.plain(modResponse);
    }

    return null;
  }
}

module.exports = { SessionMessage };