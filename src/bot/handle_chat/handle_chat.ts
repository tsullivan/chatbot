import * as Rx from 'rxjs';
import * as moment from 'moment';
import { BOT_NAME, DATE_FORMAT } from '../../constants';
import { ChatBody, ChatResponse } from '../../types';
import { RandomMessage } from './random_message';
import { Session } from '../../bot';
import { SessionMessage } from './session_message';
import { SmartMessage } from './smart_message';

const responseWorkers = [
  { Worker: SessionMessage },
  { Worker: SmartMessage },
  { Worker: RandomMessage },
];

type TimedChatResponse = ChatResponse & {
  time: string;
};

export async function handleChat(
  body: ChatBody,
  chat: Session,
  errors$: Rx.Subject<Error>
): Promise<TimedChatResponse> {
  let response;

  const { message, format } = body;
  chat.addUserHistory(message);

  if (message && format) {
    let workIdx = 0;
    while (workIdx < responseWorkers.length) {
      const { Worker } = responseWorkers[workIdx];
      const worker = new Worker(chat, message, format, errors$);
      const test: ChatResponse = await worker.getResponse(); // should resolve response.message
      if (test !== null) {
        response = test;
        chat.addBotMessage(response.message);
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
