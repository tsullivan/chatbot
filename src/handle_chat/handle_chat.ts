import * as apm from 'elastic-apm-node';
import * as moment from 'moment';
import { BOT_NAME, DATE_FORMAT } from '../constants';
import { ChatSession } from '../web/session';
import { RandomMessage } from './random_message';
import { SessionMessage } from './session_message';
import { SmartMessage } from './smart_message';

const responseWorkers = [
  { Worker: SessionMessage },
  { Worker: SmartMessage },
  { Worker: RandomMessage },
];

interface IBody {
  message: string;
  format: string;
  time: Date;
}

export interface IChatResponse {
  message: string;
}

export function handleChat(body: IBody, chat: ChatSession): Promise<IChatResponse> {
  let response;

  const { message, format } = body;
  chat.addUserHistory(message);

  if (message && format) {
    let workIdx = 0;
    while (workIdx < responseWorkers.length) {
      const { Worker } = responseWorkers[workIdx];
      const worker = new Worker(chat, message, format);
      const test = worker.getResponse();
      if (test !== null) {
        response = test;
        chat.addBotMessage(response.message);
        apm.setTag('responder', worker.getName());
        break;
      }
      workIdx++;
    }
  }

  return {
    ...response,
    name: BOT_NAME,
    time: moment(body.time).format(DATE_FORMAT),
  };
}
