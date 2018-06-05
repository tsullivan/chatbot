const apm = require('elastic-apm-node');
const { ResponseMessage } = require('./response_message');

class SessionMessage extends ResponseMessage {
  constructor(chat, userMessage, userFormat) {
    super('session', chat, userMessage, userFormat);
  }

  makeResponse(chat) {
    if (this.userFormat === 'syn') {
      chat.setWaitOnName();
      return this.plain('Hello! What is your name?');
    } else if (this.userFormat === 'hup') {
      chat.hangup();
      return this.plain('Bye!');
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
