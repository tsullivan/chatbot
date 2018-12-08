import * as express from 'express';
import { IBot } from '../../types';
import { chatRoute } from './chat';
import { statsRoute } from './stats';

export function initRoutes(app: express.Application, bot: IBot) {
  statsRoute(app, bot);
  chatRoute(app, bot);

}
