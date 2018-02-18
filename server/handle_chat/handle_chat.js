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
      let workerIdx = 0;
      while (workerIdx < responseWorkers.length) {
        const worker = new responseWorkers[workerIdx].Worker(
          chat,
          message,
          format
        );
        const test = worker.getResponse();
        if (test !== null) {
          response = test;
          break;
        }
        workerIdx++;
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
