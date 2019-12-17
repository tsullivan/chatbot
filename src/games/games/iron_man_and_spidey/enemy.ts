import { range, sample } from 'lodash';
import { oneOf } from '../../../lib';

interface Challenge {
  question: string;
  answer: string;
}

const getMathAddition = () => {
  const [a1, a2] = [sample(range(3, 20)), sample(range(1, 8))];

  if (a1 > a2) {
    const a3 = a1 - a2;
    return {
      question: `${a2} + ${a3}`,
      answer: a1.toString(),
    };
  } else {
    const a4 = a2 - a1;
    return {
      question: `${a2} - ${a1}`,
      answer: a4.toString(),
    };
  }

};

export class Enemy {
  private challenge: Challenge;

  public constructor() {
    this.challenge = oneOf([getMathAddition]);
  }

  public getChallenge(): Challenge {
    return this.challenge;
  }
}
