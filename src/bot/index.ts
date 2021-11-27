export { Bot } from './bot';
export { RandomMessage } from './handle_chat/random_message';
export { Session, SessionProto } from './session';

export interface Chat {
  username: string;
  avg_score: number;
  num_messages: number;
}
