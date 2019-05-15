import { ChatGame } from './lib';
import { Session } from '../bot';
import { join } from 'path';
import { readDir } from '../lib';

interface GameSet {
  [gameName: string]: new (session: Session) => ChatGame;
}

export async function getGames(): Promise<GameSet> {
  if (this.cache) {
    return this.cache;
  }

  return readDir(join(__dirname, './games/'));
}

getGames.cache = null;

export { ChatGame } from './lib';
