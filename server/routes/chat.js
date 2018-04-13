const apm = require('elastic-apm-node');
const { handleChat } = require('../handle_chat');

function chatRouteHandler(body, chat) {
  apm.setUserContext({
    username: chat.getName()
  });
  apm.setCustomContext({
    num_messages: chat.getHistory().length,
    avg_score: chat.getAverageScore()
  });

  return handleChat(body, chat);
}

module.exports = { chatRouteHandler };
