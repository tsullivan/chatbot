import * as Rx from 'rxjs';
import * as express from 'express';
import type { Bot, Chat } from '../../bot';
import { json as parseJson } from 'body-parser';

const jsonParser = parseJson({ type: 'application/json' });

export function chatRoute(
  app: express.Application,
  bot: Bot,
  chats$: Rx.Subject<Chat>,
  errors$: Rx.Subject<Error>
) {
  app.post('/chat', jsonParser, async (req, res) => {
    const log = bot.getLogger(['web', 'routes']);

    try {
      const result = await bot.handleChat(req.body, req.session.chat, errors$);
      res.json(result);
    } catch (err) {
      log.error([], err);
      res.status(500);
    }

    chats$.next({
      username: req.session.chat.getName(),
      avg_score: req.session.chat.getAverageScore(),
      num_messages: req.session.chat.getUserHistory().length,
    });
  });
}
