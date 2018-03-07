const apm = require('elastic-apm-node');
const { ResponseMessage } = require('./response_message');

class SessionMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super(message, format);
    this.format = format;

    try {
      const _chat = chat.save();
      this.response = this.makeResponse(_chat);
    } catch (err) {
      apm.captureError(err);
      this.response = 'An error has been logged.';
      return;
    }

  }

  makeResponse(chat) {
    const { isValid, revalidateResponse } = chat.validateSession();
    if (isValid) {
      chat.fulfillWait(this.userMessage);
    } else {
      return this.plain(revalidateResponse);
    }

    if (this.format === 'syn') {
      chat.setWaitOnName();
      return this.plain('Hello! What is your name?');
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
