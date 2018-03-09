const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { handleChat } = require('./server/handle_chat');

function routes(app, chat) {
  /*
   * Chat route
   */
  app.post('/chat', jsonParser, (req, res) => {
    apm.startTransaction();
    apm.setUserContext({
      username: chat.getName()
    });
    apm.setCustomContext({
      num_messages: chat.getHistory().length,
      avg_score: chat.getAverageScore()
    });

    res.json(handleChat(req, chat));
    apm.endTransaction();
  });
}

module.exports = { routes };
