import { Item, KeywordResponse } from '../lib';
import { WINDOW_HANDLE } from './constants';

export function getItems(game) {
  return {
    windowHandleItem: new Item({
      game,
      description: 'This looks like a pretty nice window crank handle',
      id: WINDOW_HANDLE,
      name: 'Window crank handle',
      seen: false,
      setActions: ({ setTakeable }) => {
        setTakeable({
          fn: () => {
            return new KeywordResponse({
              changeScore: 2,
              text: `Can you handle the handle? I guess you can. The handle has been taken by you.`,
            });
          },
          keyword: 'TAKE_HANDLE',
          keywordDescription: `Take the handle and put it in your pocket where it will be safe`,
        });
      },
    }),
  };
}
