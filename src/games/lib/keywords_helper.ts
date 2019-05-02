import { ChatGame } from '.';
import { KeywordResponse }  from './keyword_response';
import { MultiMap }  from '../../lib/multi_map';
import { UL }  from '../../constants';

type KeywordFromMap = [ string, { text: string } ]

type KeywordFn = () => any;

export interface KeywordsHelper {
  addKeyword: (
    keyword: string | string[],
    keywordDescription: string,
    fn: () => void
  ) => void;
  removeKeyword: (keyword: string) => void;
  hasKeyword: (keyword: string) => boolean;
  hasKeywords: () => boolean;
  getInstructions: (prefix?: string) => string;
}

export const getKeywordsHelper = () => {
  return {
    _keywords: new MultiMap(),

    /*
     * text {String} text used for getInstructions
     * fn {Function} function that must return KeywordResponse
     */
    addKeyword(keyword: string, text: string, fn: KeywordFn) {
      if (typeof keyword === undefined) {
        throw new Error('Keyword was undefined');
      }

      if (Array.isArray(keyword)) {
        const [primary, ...aliases] = keyword;
        this._keywords.set(primary, { text, fn });
        for (const alias of aliases) {
          this._keywords.addAlias(alias, primary);
        }
      } else {
        this._keywords.set(keyword, { text, fn });
      }
    },

    getInstructions(prefix = UL) {
      const keywordsArray = Array.from(this._keywords) as KeywordFromMap[];
      return keywordsArray
        .reduce((accum: string[], keywordInfo) => {
          const [command, { text }] = keywordInfo;
          return [...accum, `${prefix}${command} - ${text}`];
        }, [])
        .join('\n');
    },

    removeKeyword(keyword: string) {
      if (typeof keyword === undefined) {
        throw new Error('Keyword was undefined');
      }
      this._keywords.delete(keyword);
    },

    clearKeywords() {
      this._keywords.clear();
    },

    hasKeywords() {
      return this._keywords.size > 0;
    },

    hasKeyword(input: string) {
      return this._keywords.has(input);
    },

    getInputResponse(input: string, game: ChatGame) {
      const resp = this._keywords.get(input);
      if (!resp) {
        throw new Error(`keyword ${input} is broken: ` + JSON.stringify(this));
      }
      const { fn } = resp;
      const response = KeywordResponse.getResponseFromHandler(fn, game);

      this.clearKeywords();
      game.updateState();

      return response;
    },
  };
};
