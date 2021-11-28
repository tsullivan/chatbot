import { KeywordResponder as CKeywordResponder } from './keyword_responder';
import { Session } from '../bot';
import { getResponders } from './';
import { sample } from 'lodash';

// prettier-ignore
const charGroups = {
  vowels: [
    ['a','e','i','u','y'],
    ['a','e','i','o'],
  ],
  consos: [
    ['b','c','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','y'],
    ['f','g','h','j','k','l','m','n','y'],
  ],
};

const cleanWord = (word: string) => {
  let newWord = '';
  while (word.length > 0) {
    const chars = word.slice(0, 3).split('');
    const allVowels = chars.every(c => charGroups.vowels[0].includes(c));
    const allConsos = chars.every(c => charGroups.consos[0].includes(c));
    const inject = allVowels
      ? sample(charGroups.consos[0])
      : allConsos
        ? sample(charGroups.vowels[0])
        : '';
    newWord += chars.slice(0, 1) + inject + chars.slice(1).join('');

    word = word.slice(3); // next page
  }

  return newWord;
};

type LetterType = 'vowels' | 'consos';
type LetterValues = string[][];

const alienTalk = (text: string) => {
  const words = [];
  let source = [...text]
    .map(char => {
      const kind = sample(['vowels', 'consos']) as LetterType;
      const ready = [
        char,
        sample(charGroups.vowels) as string[],
        sample(sample(charGroups[kind] as LetterValues)) as string,
      ] as [
        string,
        string[],
        string
      ];
      return ready.join('');
    })
    .join('')
    .toLowerCase()
    .replace(/[^a-z]/g, '');

  while (source.length > 0) {
    const size = sample([2, 3, 4]);
    const partial = cleanWord(source.slice(0, size));
    const word = partial.slice(0, 1).toUpperCase() + partial.slice(1); // capitalize
    words.push(word);
    source = source.slice(size); // next page
  }
  return words.join(' ');
};

export default class AlienResponder extends CKeywordResponder {
  private getRandomResponder: () => Promise<CKeywordResponder>;

  public constructor(input: string, { chat }: { chat?: Session } = {}) {
    super(input);
    this.setName('alientalk');

    this.getRandomResponder = async () => {
      const responders = getResponders();
      const names = Object.keys(responders);
      const name = sample(names);
      const RKeywordResponder = responders[name];
      const responder = new RKeywordResponder(null, { chat });
      if (responder.isImpromptu()) {
        return responder;
      }
      return this.getRandomResponder(); // try again
    };
  }

  public testMatch(input: string) {
    return input.match(/alien/);
  }

  public async getResponse(): Promise<string> {
    const responder = await this.getRandomResponder();
    const response = await responder.getRandom();
    return alienTalk(response);
  }
}
