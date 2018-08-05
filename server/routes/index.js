const apm = require('elastic-apm-node');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ type: 'application/json' });
const { handleChat } = require('../handle_chat');

function initRoutes(app) {
  const routeHandler = async (req, res) => {
    apm.startTransaction();

    try {
      res.json(handleChat(req.body, req.session.chat));
    } catch (err) {
      console.log({ error: err }); // eslint-disable-line no-console
      res.statusCode = err.status || 500;
      res.end(err.message);
      throw err;
    }

    apm.setUserContext({
      username: req.session.chat.getName(),
    });
    apm.setCustomContext({
      num_messages: req.session.chat.getHistory().length,
      avg_score: req.session.chat.getAverageScore(),
    });
    apm.endTransaction();
  };
  app.post('/chat', jsonParser, routeHandler);

  app.get('/stats', function(req, res) {
    res.json({
      session_expires_in_sec: req.session.cookie.maxAge / 1000,
    });
  });
}

module.exports = { initRoutes };
