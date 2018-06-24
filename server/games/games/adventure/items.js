const snl = require('strip-newlines');
const { WINDOW_HANDLE } = require('./constants');
const { InventoryItem, KeywordResponse } = require('../../lib');

function getItems(game) {
  return {
    windowHandleItem: new InventoryItem({
      name: 'Window crank handle',
      id: WINDOW_HANDLE,
      description: 'This looks like a pretty nice window crank handle',
      setActions: ({ setTakeable }) => {
        setTakeable({
          keyword: 'TAKE_HANDLE',
          keywordDescription: snl`Take the handle and put it in your pocket where
          it will be safe`,
          fn: () =>
            new KeywordResponse({
              text: snl`Can you handle the handle? I guess you can. The handle
              has been taken by you.`,
              changeScore: 2,
            }),
        });
      },
      seen: false,
      game,
    }),
  };
}

module.exports = { getItems };
