import { KeywordResponse } from './keyword_response';
import { s } from '../../lib';

export const delayAndDie = () => {
  return {
    description: s`Stand around and let the weight of feeling of excitement,
      exersion, and curiousity resolve itself in your mind before deciding on
      something clever to do`,
    fn: () =>
      new KeywordResponse({
        changeScore: -50,
        isDone: true,
        text: `You get caught by the cops and they throw you back in jail FOREVER.`,
      }),
    keyword: ['STAND_AROUND', 'WAIT'],
  };
};
