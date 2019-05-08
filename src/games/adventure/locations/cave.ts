// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse, Location } from '../../lib';
import { WEST, WINDOW_HANDLE } from '../constants';

export class CaveLocation extends Location {
  private danced = false;

  public constructor(game: Adventure) {
    super({ game, name: 'Cheery Cave' });
  }

  public getDescription(game: Adventure) {
    return snl`It's unnaturally cheery in this smelly old cave. Probably
    because of the tiny village of tiny dancing skeleton hands. So cute! So
    tiny! So skeleton handsy!`;
  }

  public setLocationKeywords(game: Adventure) {
    if (!this.danced) {
      this.addKeyword('DANCE', 'Dance with the tiny skeleton hands', () => {
        this.danced = true;
        this.removeKeyword('DANCE');
        const p = [
          snl`The dance is beautiful, with flowing, synchronized forms.
            However, as hands have no ears, and skeleton hands are the forms that
            are dancing, there is no music. You can infer a beat, but you can not
            move your feet to synchronize in kind - as the hands also do not have
            feet and are instead dancing upon the tips of their skeleton fingers.
            You have no hope to try to participate. Just take a minute to enjoy the
            show. Or keep finding a way to rest your weary self. It's still late at
            night and you're still tired.`,
          'GAIN A POINT',
        ];
        return new KeywordResponse({
          changeScore: 1, // add a point for the heck of it
          text: p.join('\n\n'),
        });
      });
    }

    this.addKeyword('LOOK', 'Look closer at the tiny village', () => {
      const lns = [
        snl`The tiny village has a tiny hotel with tiny beds made for resting
          upon by tiny skeleton hands. It warms you heart to see, but it makes
          you no less tired and your warmed heart is at the same time shamed
          with the truthful knowledge that you can find no rest in this
          enjoyable place.`,
      ];

      if (this.hasFloorItem(WINDOW_HANDLE)) {
        lns.push(snl`The tiny hotel building has a strange type of flagpole
          on the roof that looks like maybe a crank handle for a window. Maybe
          a castle window(s). However, it might be impossible to know for sure
          if that's what it really is, because this game is very limited. The
          crank handle to open or close castle windows might just be for
          decoration. That would be too bad.`);
        const handle = game.getItemFromCollection(WINDOW_HANDLE);
        handle.see();
      }

      return new KeywordResponse({
        text: lns.join('\n\n'),
      });
    });

    this.addKeyword('EXIT', 'Get out of the cheery smelly old cave.', () =>
      this.followExit(WEST),
    );
  }
}
