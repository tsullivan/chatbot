const apm = require('elastic-apm-node');
const moment = require('moment');
const { DATE_FORMAT, BOT_NAME } = require('../constants');
const { SessionMessage } = require('./session_message');
const { SmartMessage } = require('./smart_message');
const { RandomMessage } = require('./random_message');

const responseWorkers = [
  { Worker: SessionMessage },
  { Worker: SmartMessage },
  { Worker: RandomMessage }
];

function handleChat(req, chat) {
  let response;

  const { message, format } = req.body;
  if (message && format) {
    chat.addHistory(message);

    let workIdx = 0;
    while (workIdx < responseWorkers.length) {
      const { Worker } = responseWorkers[workIdx];
      const worker = new Worker(chat, message, format);
      const test = worker.getResponse();
      if (test !== null) {
        apm.setTag('responder', worker.getName());
        response = test;
        break;
      }
      workIdx++;
    }
  }

  const json = Object.assign({}, response, {
    name: BOT_NAME,
    time: moment(req.body.time).format(DATE_FORMAT)
  });
  return json;
}

module.exports = { handleChat };
