import { range, sample } from 'lodash';
import { oneOf } from '../../../lib';
import { ChallengeCode } from './';

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
  private ec: {
  question: string;
  answer: string;
};

  public constructor(_code: ChallengeCode) {
    this.ec = oneOf([getMathAddition]);
  }

  public getChallenge() {
    return this.ec;
  }
}

