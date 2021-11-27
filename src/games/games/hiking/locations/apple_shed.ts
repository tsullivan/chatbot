import { snl } from '../../../../lib';
import { Adventure, KeywordResponse, Location, parajoin } from '../../../lib';
import { APPLES, EAST, YOGURT } from '../constants';

export class AppleShedLocation extends Location {
  private hasYogurt = false;
  private numApples = 100;

  public constructor(game: Adventure) {
    super({ game, name: 'The Apple Store' });
  }

  public getDescription(_game: Adventure) {
    const lns = [
      snl`You're in a giant, giant red sphere in the trees. This is an Apple
        Store. On the inside, it actually a shed. Inside there are many, many
        shelves full of apples. It looks like there are exactly
        ${this.numApples} apples.`,
    ];
    if (this.numApples > 0) {
      lns.push(
        snl`There's no one in the store, but there's a man standing on a tree
          branch out back. He looks inside a window and sees you, then he comes
          in and says a friendly hello.`,
        snl`"Oh, a customer! Would you like to buy an apple?" he says.`
      );
      // TODO npc class that knows if the character has said a certain thing yet
    }
    return parajoin(lns);
  }

  public setLocationKeywords(game: Adventure) {
    const yogurt = game.getItemFromCollection(YOGURT);
    let pxEx: string;
    if (!game.inInventory(APPLES) || !game.inInventory(YOGURT)) {
      pxEx = snl`"Thanks for coming!" says the business man. "I still have a few items left for sale if
        you're ever interested!"`;
    }
    this.addKeyword('EXIT', `If you want to leave the Apple Store`, () =>
      this.followExit(EAST, pxEx)
    );
    this.addKeyword('LOOK', `Look at the contents of the Apple Store`, () => {
      let resp;
      if (this.numApples > 0) {
        resp = new KeywordResponse({
          text: `There are exactly ${this.numApples} apples on the shelves.`,
        });
      } else if (!game.inInventory(YOGURT)) {
        yogurt.see();
        this.hasYogurt = true;
        resp = new KeywordResponse({
          text: snl`There are no apples on the shelves. There is nothing in the
            store. It is completely empty. Except for some yogurt. But the yogurt
            has ghosts in it.`,
        });
      } else {
        resp = new KeywordResponse({
          text: 'The Apple Store is completely empty.',
        });
      }
      return resp;
    });

    if (!game.inInventory(APPLES)) {
      this.addKeyword(
        'BUY_APPLE',
        `If you'd like to own one of these delicious apples.`,
        () => {
          this.numApples = 0;
          game.addToInventory(APPLES);
          this.removeKeyword('BUY_APPLE');
          const lns = [
            snl`"Oh, you'd like to own one of these delicious apples?" says the man. "Well, you can have one. It costs $1,000."`,
            snl`"I have no money!" You tell him.`,
            snl`"Oh, well, you can still have one apple, for free." he says.`,
            snl`"THANKS!" you say.`,
            snl`"Actually, you can have all of the apples for free." he says.`,
            'GAIN 10 POINTS',
          ];
          return new KeywordResponse({
            changeScore: 10,
            text: lns.join('\n\n'),
          });
        }
      );
    } else if (yogurt.isSeen() && this.hasYogurt) {
      this.addKeyword('BUY_YOGURT', `Purchase the yogurt with ghosts in it.`, () => {
        game.addToInventory(YOGURT);
        this.removeKeyword('BUY_YOGURT');
        this.hasYogurt = false;
        const lns = [
          snl`"Oh, you'd like to own this yogurt?" says the man. "Well, you can have it for free, because it has ghosts in it."`,
          snl`"GHOSTS!?" You say.`,
          snl`"Yes, ghosts." he says.`,
          snl`"THANKS FOR THE GHOSTGURT!" you say.`,
          snl`"By the way, ghosts dislike being on the sun." he says.`,
          'GAIN 6 POINTS',
        ];
        return new KeywordResponse({
          changeScore: 6,
          text: lns.join('\n\n'),
        });
      });
    }
  }
}
