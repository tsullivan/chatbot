const moment = require('moment');
const { DATE_FORMAT, BOT_NAME } = require('../constants');
const { SessionMessage } = require('./session_message');
const { SmartMessage } = require('./smart_message');

function handleChat(req) {
  let response = { format: 'plain' };

  const { message, format } = req.body;
  if (message && format) {
    const { chat } = req.session;
    // chat.addHistory(message);

    if (format === 'syn') {
      chat.setWaitOnName();
      response.message = 'Hello! What is your name?';
    } else {
      const sessionMessage = new SessionMessage(chat, message, format);
      const sessionResponse = sessionMessage.getResponse();
      if (sessionResponse !== null) {
        response = sessionResponse;
      } else {
        const smartMessage = new SmartMessage(chat, message, format);
        response = smartMessage.getResponse();
      }
    }

  }

  const json = Object.assign({}, response, {
    name: BOT_NAME,
    time: moment(req.body.time).format(DATE_FORMAT)
  });
  return json;
}

module.exports = { handleChat };
