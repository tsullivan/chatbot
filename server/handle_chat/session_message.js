const apm = require('elastic-apm-node');
const { ResponseMessage } = require('./response_message');

class SessionMessage extends ResponseMessage {
  constructor(chat, userMessage, userFormat) {
    super('session', chat, userMessage, userFormat);
  }

  makeResponse(chat) {
    const format = this.userFormat;
    const { isValid, revalidateResponse } = chat.validateSession(format);

    if (format === 'syn') {
      if (isValid) {
        return this.plain(`Hello again, ${chat.getName()}!`);
      } else {
        chat.setWaitOnName();
        return this.plain('Hello! What is your name?');
      }
    } else if (format === 'hup') {
      chat.hangup();
      return this.plain('Bye!');
    } else if (!isValid) {
      return this.plain(revalidateResponse);
    }

    chat.fulfillWait(this.userMessage);

    const nextBotMessage = chat.popNextBotMessage();
    if (nextBotMessage !== null) {
      return this.plain(nextBotMessage);
    }

    if (chat.getGame() != null) {
      const game = chat.getGame();
      apm.setTag('game', game.getName());
      const { isDone, response } = game.testInput(this.userMessage);
      let modResponse = response;
      game.save();
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
