import { json as parseJson } from 'body-parser';
import * as apm from 'elastic-apm-node';
import { IBot } from '../../types';
import { handleChat } from '../handle_chat';

const jsonParser = parseJson({ type: 'application/json' });

export function initRoutes(app, bot: IBot) {
  const routeHandler = async (req, res) => {
    apm.startTransaction();
    const log = bot.getLogger();

    try {
      const result = handleChat(req.body, req.session.chat);
      res.json(result);
    } catch (err) {
      log.error([], err);
      res.statusCode = err.status || 500;
      res.end(err.message);
      throw err;
    }

    apm.setUserContext({
      username: req.session.chat.getName(),
    });
    apm.setCustomContext({
      avg_score: req.session.chat.getAverageScore(),
      num_messages: req.session.chat.getUserHistory().length,
    });
    apm.endTransaction();
  };
  app.post('/chat', jsonParser, routeHandler);

  app.get('/stats', (req, res) => {
    res.json({
      session_expires_in_sec: req.session.cookie.maxAge / 1000,
    });
  });
}
