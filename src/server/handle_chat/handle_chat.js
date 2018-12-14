const apm = require('elastic-apm-node');
const moment = require('moment');
const { DATE_FORMAT, BOT_NAME } = require('../../constants');
const { SessionMessage } = require('./session_message');
const { SmartMessage } = require('./smart_message');
const { RandomMessage } = require('./random_message');

const responseWorkers = [
  { Worker: SessionMessage },
  { Worker: SmartMessage },
  { Worker: RandomMessage },
];

function handleChat(body, chat) {
  let response;

  const { message, format } = body;
  chat.addUserHistory(message);

  if (message && format) {
    let workIdx = 0;
    while (workIdx < responseWorkers.length) {
      const { Worker } = responseWorkers[workIdx];
      const worker = new Worker(chat, message, format);
      const test = worker.getResponse();
      if (test !== null) {
        response = test;
        chat.addBotMessage(response.message);
        apm.setTag('responder', worker.getName());
        break;
      }
      workIdx++;
    }
  }

  const json = Object.assign({}, response, {
    name: BOT_NAME,
    time: moment(body.time).format(DATE_FORMAT),
  });
  return json;
}

module.exports = { handleChat };
