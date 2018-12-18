import { json as parseJson } from 'body-parser';
import * as apm from 'elastic-apm-node';
import * as express from 'express-session';
import { handleChat } from '../../handle_chat';
import { IBot } from '../../types';

const jsonParser = parseJson({ type: 'application/json' });

export function chatRoute(app: express.Application, bot: IBot) {
  app.post('/chat', jsonParser, async (req, res) => {
    apm.startTransaction();
    const log = bot.getLogger(['web', 'routes']);

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
  });
}
