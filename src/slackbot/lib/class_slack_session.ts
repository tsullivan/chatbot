import { IWebSession } from '../../web/session';

export class SlackSession implements IWebSession {
  public readonly id: string;
  public readonly save: () => void;
  public readonly chat: any;
  public destroy() {
    return;
  }
}
