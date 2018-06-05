const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { handleChat } = require('../handle_chat');

function initRoutes(app, unresolvedChat) {
  const routeHandler = async ({ body }, res) => {
    apm.startTransaction();

    const chat = await unresolvedChat;
    res.json(handleChat(body, chat));

    apm.setUserContext({
      username: chat.getName(),
    });
    apm.setCustomContext({
      num_messages: chat.getHistory().length,
      avg_score: chat.getAverageScore(),
    });
    apm.endTransaction();
  };
  app.post('/chat', jsonParser, routeHandler);
}

module.exports = { initRoutes };
