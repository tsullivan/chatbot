import { ChatSession } from '../../web/session';
import { ChatGame } from '../chat_game';

const WIN_CODE = '77';
const LOSE_CODE = 'kl';

const notDone = (response) => ({ response, format: 'markdown', isDone: false });
const yesDone = (response) => ({ response, format: 'markdown', isDone: true });

export class Game extends ChatGame {
  public score: number;
  private batStuff: string[];

  constructor(session: ChatSession) {
    super(session);
    this.setName('batman');
  }

  public init() {
    this.score = 0;
    this.batStuff = [];
  }

  public testInput(input) {
    if (input === WIN_CODE || input === LOSE_CODE) {
      let response;
      if (input === WIN_CODE) {
        response = 'You won! Right now!!';
      } else if (input === LOSE_CODE) {
        this.score = 0;
        response = 'Type "kl" and you lose the Batgame :(';
      }

      const items = this.batStuff.reduce((accum, curr) => `${accum}\n- ${curr}`, '');
      return yesDone(
        `${response} "${input}" ended the Batgame. Your Batstuff is:\n${items}\n\nYour Batscore is ${
          this.score
        }.`,
      );
    } else {
      this.score += 1;
      this.batStuff.push(input);

      return notDone(`Adding ${input} to the Batcave.`);
    }
  }

  public getWelcome() {
    return `# Let's play Batman.\nType in stuff for the Batcave. Type "77" to
      keep your points or "kl" to throw it all away.`;
  }
}
