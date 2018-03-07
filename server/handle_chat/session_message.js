const apm = require('elastic-apm-node');
const { ResponseMessage } = require('./response_message');

class SessionMessage extends ResponseMessage {
  constructor(chat, message, format) {
    super('session', chat, message, format);
  }

  makeResponse(chat) {
    if (this.format === 'syn') {
      chat.setWaitOnName();
      return this.plain('Hello! What is your name?');
    }

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
      apm.setTag('game', chat.game.getName());
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
