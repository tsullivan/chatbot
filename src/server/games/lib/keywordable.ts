import { KeywordResponse } from './class_keyword_response';

export declare class Keywordable {
  public addKeyword(keyword: string, keywordDescription: string, fn: () => KeywordResponse): void;
  public removeKeyword(keyword: string): void;
}
