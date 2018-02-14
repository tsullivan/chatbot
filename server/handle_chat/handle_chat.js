const moment = require('moment');
const { DATE_FORMAT, BOT_NAME } = require('../constants');
const { SmartMessage } = require('./smart_message');

function handleChat(req) {
  let json = {};

  const { message, format } = req.body;
  if (message && format) {
    const { chat } = req.session;
    const smartMessage = new SmartMessage(chat, message, format);

    json = Object.assign({},
      smartMessage.getResponse(),
      {
        name: BOT_NAME,
        time: moment(req.body.time).format(DATE_FORMAT)
      }
    );
  }

  return json;
}

module.exports = { handleChat };
