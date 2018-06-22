const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { handleChat } = require('../handle_chat');

function initRoutes(app, chatPromise) {
  const routeHandler = async ({ body }, res) => {
    apm.startTransaction();

    const chat = await chatPromise;
    try {
      res.json(handleChat(body, chat));
    } catch (err) {
      console.log({ error: err }); // eslint-disable-line no-console
      res.statusCode = err.status || 500;
      res.end(err.message);
    }

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
